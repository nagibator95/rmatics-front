import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class JoinService {
    constructor(private http: HttpClient) {}

    join(workshopId: number, token: string): Observable<any> {
        const formData = new FormData();

        formData.append('token', token);

        return this.http.post<any>(
            environment.apiUrl + `/workshop/${workshopId}/join`,
            formData,
        );
    }
}
