import { HttpClient } from '@angular/common/http';
import {Injectable, Type} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ModalService } from '../../../../modal/modal.service';
import { SubmissionComponent} from '../../../../pages/contest/submission/submission.component';
import { ApiResponse } from '../../../../utils/types';
import { RunCommentApi, RunProtocolApi, RunSourceApi } from '../types/contest.types';

import { ContestService } from './contest.service';

@Injectable()
export class SubmissionService {
  constructor(
    private contestService: ContestService,
    private modalService: ModalService,
    private http: HttpClient,
  ) {
  }

  showSubmission() {
    this.modalService.open({
      component: SubmissionComponent,
      data: { submissionService: this },
    });
  }

  getSubmissionProtocol(submissionId: number): Observable<ApiResponse<RunProtocolApi>> {
    return this.http.get<ApiResponse<RunProtocolApi>>(environment.apiUrl + `/run/${submissionId}/protocol`);
  }

  getSubmissionSource(submissionId: number): Observable<ApiResponse<RunSourceApi>> {
    return this.http.get<ApiResponse<RunSourceApi>>(environment.apiUrl + `/run/${submissionId}/source`);
  }

  getSubmissionComments(submissionId: number): Observable<ApiResponse<RunCommentApi[]>> {
    return this.http.get<ApiResponse<RunCommentApi[]>>(environment.apiUrl + `/run/${submissionId}/comments`);
  }
}
