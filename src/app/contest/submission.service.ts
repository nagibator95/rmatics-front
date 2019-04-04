import { combineLatest, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ModalService } from '../modal/modal.service';
import { languages } from '../shared/constants';
import { ApiResponse } from '../utils/types';
import { Store } from '../utils/Store';

import { ContestService } from './contest.service';
import {
  RunProtocol,
  RunProtocolApi,
  RunSource,
  RunSourceApi,
  SubmissionDetailed,
} from './contest.types';
import { SubmissionComponent } from './submission/submission.component';

interface SubmissionState {
  protocol?: RunProtocol;
  source?: RunSource,
  statusCode: number;
  status: string;
  error?: string;
  isFetching: boolean;
}

const initialState: SubmissionState = {
  statusCode: 200,
  status: 'success',
  error: '',
  isFetching: false,
};

const formatProtocol = (protocol: RunProtocolApi): RunProtocol => ({
  compilerOutput: protocol.compiler_output,
  host: protocol.host,
  tests: Object.keys(protocol.tests).map(testId => {
    const id = Number(testId);

    return {
      id,
      status: protocol.tests[id].string_status,
      time: protocol.tests[id].time,
      realTime: protocol.tests[id].real_time,
      memory: protocol.tests[id].max_memory_used,
    };
  }),
});

const formatSource = (source: RunSourceApi): RunSource => ({
  code: source.source,
  language: languages.find(language => language.id === source.language_id) || languages[0],
})

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  private store = new Store<SubmissionState>(initialState);
  private submissionId?: number;
  isFetching = combineLatest(
    this.contestService.isSubmissionsFetching,
    this.store.state.pipe(map(state => state.isFetching)),
    (one, two) => one || two,
  );
  submission = combineLatest(
    this.contestService.submissions.pipe(map(submissions => submissions.find(val => val.id === this.submissionId))),
    this.store.state.pipe(map(state => state.protocol)),
    this.store.state.pipe(map(state => state.source)),
    (submission, protocol, source) => ({ ...submission, protocol, source } as SubmissionDetailed),
  );
  problem = this.contestService.problem;

  constructor(
    private contestService: ContestService,
    private modalService: ModalService,
    private http: HttpClient,
  ) {
  }

  showSubmission(submissionId: number) {
    this.submissionId = submissionId;
    this.getSubmissionProtocol(submissionId);
    this.getSubmissionSource(submissionId);

    this.modalService.open({
      component: SubmissionComponent,
      data: { submissionService: this },
    });
  }

  getSubmissionProtocol(submissionId: number) {
    this.store.setState(of({
      ...this.store.getState(),
      isFetching: true,
    }));

    const nextState = this.http.get<ApiResponse<RunProtocolApi>>(environment.apiUrl + `/contest/run/${submissionId}/protocol`)
      .pipe(
        map(response => ({
          ...this.store.getState(),
          isFetching: false,
          statusCode: response.status_code,
          status: response.status,
          protocol: formatProtocol(response.data as RunProtocolApi),
        })),
        catchError(({ error }) => of({
          ...this.store.getState(),
          isFetching: false,
          statusCode: error.status_code,
          status: error.status,
          error: error.error,
        })),
      );

    this.store.setState(nextState);
  }

  getSubmissionSource(submissionId: number) {
    this.store.setState(of({
      ...this.store.getState(),
      isFetching: true,
    }));

    const nextState = this.http.get<ApiResponse<RunSourceApi>>(environment.apiUrl + `/contest/run/${submissionId}/source`)
      .pipe(
        map(response => {
          return ({
            ...this.store.getState(),
            isFetching: false,
            statusCode: response.status_code,
            status: response.status,
            source: formatSource(response.data as RunSourceApi),
          })
        }),
        catchError(({ error }) => of({
          ...this.store.getState(),
          isFetching: false,
          statusCode: error.status_code,
          status: error.status,
          error: error.error,
        })),
      );

    this.store.setState(nextState);
  }
}
