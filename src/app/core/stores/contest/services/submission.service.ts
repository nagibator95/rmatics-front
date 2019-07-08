import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ModalService } from '../../../../modal/modal.service';
import { SubmissionComponent} from '../../../../pages/contest/submission/submission.component';
import { ApiResponse } from '../../../../utils/types';
import {IShowSubmission, RunCommentApi, RunProtocolApi, RunSourceApi} from '../types/contest.types';

@Injectable()
export class SubmissionService {
  constructor(
    private modalService: ModalService,
    private http: HttpClient,
  ) {}

  showSubmission() {
    this.modalService.open({
      component: SubmissionComponent,
      data: { submissionService: this },
    });
  }

  getSubmissionProtocol(value: IShowSubmission): Observable<ApiResponse<RunProtocolApi>> {
    return this.http.get<ApiResponse<RunProtocolApi>>(environment.apiUrl + `/contest/${value.contestId}/problem/${value.problemId}/run/${value.runId}/protocol`);
  }

  getSubmissionSource(submissionId: number): Observable<ApiResponse<RunSourceApi>> {
    return this.http.get<ApiResponse<RunSourceApi>>(environment.apiUrl + `/run/${submissionId}/source`);
  }

  getSubmissionComments(submissionId: number): Observable<ApiResponse<RunCommentApi[]>> {
    return this.http.get<ApiResponse<RunCommentApi[]>>(environment.apiUrl + `/run/${submissionId}/comments`);
  }
}
