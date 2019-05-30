import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ModalService } from '../../../../modal/modal.service';
import { SubmissionComponent} from '../../../../pages/contest/submission/submission.component';
import { languages } from '../../../../shared/constants';
import { ApiResponse } from '../../../../utils/types';
import { Store } from '../../../../utils/Store';
import { RunComment, RunCommentApi, RunProtocol, RunProtocolApi, RunSource, RunSourceApi } from '../../contest/types/contest.types';

import { ContestService } from '../../contest/services/contest.service';

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
  };
  comments: {
    data?: RunComment[];
    statusCode: number;
    status: string;
    error?: string;
    isFetching: boolean;
  };
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
  },
  comments: {
    statusCode: 200,
    status: 'success',
    error: '',
    isFetching: false,
  },
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
});

const formatComment = (comment: RunCommentApi): RunComment => ({
    author: {
      firstname: comment.author_user.firstname,
      id: comment.author_user.id,
      lastname: comment.author_user.lastname,
      username: comment.author_user.username,
    },
    comment: comment.comment,
    date: comment.date,
    id: comment.id,
    runId: comment.run_id,
    userId: comment.user_id,
  }
);

@Injectable()
export class SubmissionService {
  private store = new Store<SubmissionState>(initialState);
  private submissionId?: number;

  isSubmissionsFetching = this.contestService.isSubmissionsFetching;
  isProtocolFetching = this.store.state.pipe(map(state => state.protocol.isFetching));
  isSourceFetching = this.store.state.pipe(map(state => state.source.isFetching));
  areCommentsFetching = this.store.state.pipe(map(state => state.comments.isFetching));

  submissionPreview = this.contestService.submissions.pipe(map(submissions => submissions.find(val => val.id === this.submissionId)));
  protocol = this.store.state.pipe(map(state => state.protocol.data));
  source = this.store.state.pipe(map(state => state.source.data));
  comments = this.store.state.pipe(map(state => state.comments.data));
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
    this.getSubmissionComments(submissionId);

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
      },
    }));

    const nextState = this.http.get<ApiResponse<RunProtocolApi>>(environment.apiUrl + `/run/${submissionId}/protocol`)
      .pipe(
        map(response => {
          console.log(response);
          return {
            ...this.store.getState(),
            protocol: {
              isFetching: false,
              statusCode: response.status_code,
              status: response.status,
              data: formatProtocol(response.data as RunProtocolApi),
            },
          };
      }),
        catchError(({ error }) => {
          console.log(error);

          return of({
            ...this.store.getState(),
            protocol: {
              isFetching: false,
              statusCode: error.status_code,
              status: error.status,
              error: error.error,
            },
          });
        }),
      );

    this.store.setState(nextState);
  }

  getSubmissionSource(submissionId: number) {
    this.store.setState(of({
      ...this.store.getState(),
      source: {
        ...initialState.source,
        isFetching: true,
      },
    }));

    const nextState = this.http.get<ApiResponse<RunSourceApi>>(environment.apiUrl + `/run/${submissionId}/source`)
      .pipe(
        map(response => ({
          ...this.store.getState(),
          source: {
            isFetching: false,
            statusCode: response.status_code,
            status: response.status,
            data: formatSource(response.data as RunSourceApi),
          },
        })),
        catchError(({ error }) => of({
          ...this.store.getState(),
          source: {
            isFetching: false,
            statusCode: error.status_code,
            status: error.status,
            error: error.error,
          },
        })),
      );

    this.store.setState(nextState);
  }

  getSubmissionComments(submissionId: number) {
    this.store.setState(of({
      ...this.store.getState(),
      comments: {
        ...initialState.comments,
        isFetching: true,
      },
    }));

    const nextState = this.http.get<ApiResponse<RunCommentApi[]>>(environment.apiUrl + `/run/${submissionId}/comments`)
      .pipe(
        map(response => ({
          ...this.store.getState(),
          comments: {
            isFetching: false,
            statusCode: response.status_code,
            status: response.status,
            data: (response.data as RunCommentApi[]).map(formatComment),
          },
        })),
        catchError(({ error }) => of({
          ...this.store.getState(),
          comments: {
            isFetching: false,
            statusCode: error.status_code,
            status: error.status,
            error: error.error,
          },
        })),
      );

    this.store.setState(nextState);
  }
}
