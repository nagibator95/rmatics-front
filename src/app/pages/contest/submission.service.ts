import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ModalService } from '../../modal/modal.service';
import { languages } from '../../shared/constants';
import { ApiResponse } from '../../utils/types';
import { Store } from '../../utils/Store';

import { ContestService } from './contest.service';
import { RunProtocol, RunProtocolApi, RunSource, RunSourceApi } from './contest.types';
import { SubmissionComponent } from './submission/submission.component';

interface SubmissionState {
  protocol: {
    data?: RunProtocol;
    statusCode: number;
    status: string;
    error?: string;
    isFetching: boolean;
  };
  source: {
    data?: RunSource;
    statusCode: number;
    status: string;
    error?: string;
    isFetching: boolean;
  },
}

const initialState: SubmissionState = {
  protocol: {
    statusCode: 200,
    status: 'success',
    error: '',
    isFetching: false,
  },
  source: {
    statusCode: 200,
    status: 'success',
    error: '',
    isFetching: false,
  }
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

@Injectable()
export class SubmissionService {
  private store = new Store<SubmissionState>(initialState);
  private submissionId?: number;

  isSubmissionsFetching = this.contestService.isSubmissionsFetching;
  isProtocolFetching = this.store.state.pipe(map(state => state.protocol.isFetching));
  isSourceFetching = this.store.state.pipe(map(state => state.source.isFetching));

  submissionPreview = this.contestService.submissions.pipe(map(submissions => submissions.find(val => val.id === this.submissionId)));
  protocol = this.store.state.pipe(map(state => state.protocol.data));
  source = this.store.state.pipe(map(state => state.source.data));
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
      protocol: {
        ...initialState.protocol,
        isFetching: true,
      }
    }));

    const nextState = this.http.get<ApiResponse<RunProtocolApi>>(environment.apiUrl + `/contest/run/${submissionId}/protocol`)
      .pipe(
        map(response => ({
          ...this.store.getState(),
          protocol: {
            isFetching: false,
            statusCode: response.status_code,
            status: response.status,
            data: formatProtocol(response.data as RunProtocolApi),
          }
        })),
        catchError(({ error }) => of({
          ...this.store.getState(),
          protocol: {
            isFetching: false,
            statusCode: error.status_code,
            status: error.status,
            error: error.error,
          }
        })),
      );

    this.store.setState(nextState);
  }

  getSubmissionSource(submissionId: number) {
    this.store.setState(of({
      ...this.store.getState(),
      source: {
        ...initialState.source,
        isFetching: true,
      }
    }));

    const nextState = this.http.get<ApiResponse<RunSourceApi>>(environment.apiUrl + `/contest/run/${submissionId}/source`)
      .pipe(
        map(response => ({
          ...this.store.getState(),
          source: {
            isFetching: false,
            statusCode: response.status_code,
            status: response.status,
            data: formatSource(response.data as RunSourceApi),
          }
        })),
        catchError(({ error }) => of({
          ...this.store.getState(),
          source: {
            isFetching: false,
            statusCode: error.status_code,
            status: error.status,
            error: error.error,
          }
        })),
      );

    this.store.setState(nextState);
  }
}
