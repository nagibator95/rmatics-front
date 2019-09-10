import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

import {ModalService} from '../../../../modal/modal.service';
import {SubmissionComponent} from '../../../../pages/contest/submission/submission.component';
import {IApiResponse} from '../../../../utils/types';
import {
    IShowSubmission,
    IRunCommentApi,
    IRunProtocolApi,
    IRunSourceApi,
} from '../types/contest.types';

@Injectable()
export class SubmissionService {
    constructor(private modalService: ModalService, private http: HttpClient) {}

    showSubmission() {
        this.modalService.open({
            component: SubmissionComponent,
            data: {submissionService: this},
        });
    }

    getSubmissionProtocol(
        value: IShowSubmission,
    ): Observable<IApiResponse<IRunProtocolApi>> {
        return this.http.get<IApiResponse<IRunProtocolApi>>(
            environment.apiUrl +
                `/contest/${value.contestId}/problem/${value.problemId}/run/${value.runId}/protocol`,
        );
    }

    getSubmissionSource(submissionId: number): Observable<IApiResponse<IRunSourceApi>> {
        return this.http.get<IApiResponse<IRunSourceApi>>(
            environment.apiUrl + `/run/${submissionId}/source`,
        );
    }

    getSubmissionComments(
        submissionId: number,
    ): Observable<IApiResponse<IRunCommentApi[]>> {
        return this.http.get<IApiResponse<IRunCommentApi[]>>(
            environment.apiUrl + `/run/${submissionId}/comments`,
        );
    }
}
