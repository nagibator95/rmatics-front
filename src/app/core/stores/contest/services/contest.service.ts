import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../utils/types';

import {
  ContestConnectionApi,
  ProblemApi,
  SubmissionApi,
} from '../types/contest.types';

const defaultPageSize = 5;

@Injectable()
export class ContestService {
  constructor(private http: HttpClient) {}

  addSubmission(problemId: number, file: File, languageId: number, contestId: number): Observable<ApiResponse<SubmissionApi[]>> {
    const formData = new FormData();
    formData.append('lang_id', languageId.toString());
    formData.append('statement_id', contestId.toString());
    formData.append('file', file, file.name);

    return this.http.post<ApiResponse<SubmissionApi[]>>(
      environment.apiUrl + `/contest/${contestId}/problem/${problemId}/submission`,
      formData,
    );
  }

  getSubmissions(problemId: number, page: number, contestId: number): Observable<ApiResponse<SubmissionApi[]>> {
    return this.http.get<ApiResponse<SubmissionApi[]>>(environment.apiUrl
      + `/contest/${contestId}/problem/${problemId}/submission?count=${defaultPageSize}&page=${page}`,
    );
  }

  getContest(courseId: number): Observable<ApiResponse<ContestConnectionApi>> {
    return this.http.get<ApiResponse<ContestConnectionApi>>(environment.apiUrl + `/contest/${courseId}`);
  }

  getProblem(problemId: number, contestId: number): Observable<ApiResponse<ProblemApi>> {
    return this.http.get<ApiResponse<ProblemApi>>(environment.apiUrl + `/contest/${contestId}/problem/${problemId}`);
  }
}
