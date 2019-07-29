import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JoinService {
  constructor(private http: HttpClient) { }

  join(workshopId: number, token: string): Observable<any> {
    const formData = new FormData();
    formData.append('token', token);

    return this.http.post<any>( `http://85.93.88.189:12343/api/v1//workshop/${workshopId}/join`, formData);
  }
}
