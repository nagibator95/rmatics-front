import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/core/stores/auth/models/apiResponse.model';
import { Store } from 'src/app/utils/Store';
import { environment } from 'src/environments/environment';

import {WorkshopApi} from './workshop.types';

interface WorkshopState {
  statusCode: number;
  status: string;
  error?: string;
  isFetching: boolean;
  workshop?: WorkshopApi;
}

const initialState: WorkshopState = {
  statusCode: 200,
  status: 'success',
  error: '',
  isFetching: false,
};

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {
  private store = new Store<WorkshopState>(initialState);
  workshop = this.store.state.pipe(map(state => state.workshop));
  isFetching = this.store.state.pipe(map(state => state.isFetching));
  joinMessage = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  getWorkshop(workshopId: number) {
    this.clearWorkShop();
    this.setFetching(true);

    const nextState = this.http.get<ApiResponse<WorkshopApi>>(environment.apiUrl
      + `/workshop/${workshopId}`,
    ).pipe(
      map(response => ({
        ...this.store.getState(),
        isFetching: false,
        statusCode: response.status_code,
        status: response.status,
        workshop: response.data,
      })),
      catchError(({ error }) => of({
        ...this.store.getState(),
        statusCode: error.status_code,
        status: error.status,
        error: error.error,
      })),
    );

    this.store.setState(nextState);
  }

  setFetching(isFetching: boolean) {
    this.store.setState(of({
      ...this.store.getState(),
      isFetching: isFetching,
    }));
  }

  clearWorkShop() {
    this.store.setState(of({
      ...this.store.getState(),
      workshop: null,
    }));
  }
}
