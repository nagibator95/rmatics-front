import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {of, Observable} from 'rxjs';
import {delay, filter, take, tap} from 'rxjs/operators';

import {ContestActions, ContestSelectors} from '../../core/stores/contest';

import {Contest} from '../../core/stores/contest/types/contest.types';

@Injectable()
export class ContestResolverService implements Resolve<Contest> {
  constructor(private router: Router,
              private route: ActivatedRoute,
              private store$: Store<any>) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Contest> {
    console.log(route.params.contestId);
    this.store$.dispatch(new ContestActions.QueryContest(Number(route.params.contestId)));
    return this.waitForContestToDownload();
  }

  waitForContestToDownload(): Observable<Contest> {
    return this.store$.pipe(select(ContestSelectors.getContest()))
      .pipe(
        filter(contest => !!contest),
        take(1),
        tap(contest => {
          const problems = contest.problems;
          console.log(contest);
          this.router.navigate([problems[0].href]);
        }),
      );
  }
}
