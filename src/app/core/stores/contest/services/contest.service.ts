import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {environment} from '../../../../../environments/environment';
import {IApiResponse} from '../../../../utils/types';

import {IContestConnectionApi, IProblemApi, ISubmissionApi} from '../types/contest.types';

const defaultPageSize = 5;

@Injectable()
export class ContestService {
    constructor(private http: HttpClient) {}

    addSubmission(
        problemId: number,
        file: File,
        languageId: number,
        contestId: number,
    ): Observable<IApiResponse<ISubmissionApi[]>> {
        const formData = new FormData();

        formData.append('lang_id', languageId.toString());
        formData.append('statement_id', contestId.toString());
        formData.append('file', file, file.name);

        return this.http.post<IApiResponse<ISubmissionApi[]>>(
            environment.apiUrl + `/contest/${contestId}/problem/${problemId}/submission`,
            formData,
        );
    }

    getSubmissions(
        problemId: number,
        page: number,
        contestId: number,
    ): Observable<IApiResponse<ISubmissionApi[]>> {
        return this.http.get<IApiResponse<ISubmissionApi[]>>(
            environment.apiUrl +
                `/contest/${contestId}/problem/${problemId}/submission?count=${defaultPageSize}&page=${page}`,
        );
    }

    getContest(courseId: number): Observable<IApiResponse<IContestConnectionApi>> {
        return this.http.get<IApiResponse<IContestConnectionApi>>(
            environment.apiUrl + `/contest/${courseId}`,
        );
    }

    getProblem(
        problemId: number,
        contestId: number,
    ): Observable<IApiResponse<IProblemApi>> {
        return this.http.get<IApiResponse<IProblemApi>>(
            environment.apiUrl + `/contest/${contestId}/problem/${problemId}`,
        );
    }
}
