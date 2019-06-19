import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {RouterActions} from '../core/stores/router';
import {Routes} from '../core/stores/router/enum/routes.enum';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store$: Store<any>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((response: any) => {
        if (response instanceof HttpErrorResponse && response.status === 401) {
          console.log(response);
          this.store$.dispatch(new RouterActions.Go({path: [Routes.AuthRoute]}));
        }
        // TODO: разобраться - переводить на форму авторизации или слать повторный запрос на обновление refresh-токена
        return throwError(response);
      }),
    );
  }
}
