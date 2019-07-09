import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, take, tap} from 'rxjs/operators';

import {ContestActions, ContestSelectors} from '../../core/stores/contest';
import {Contest} from '../../core/stores/contest/types/contest.types';

import {MessageResolverService} from './message-resolver.service';

@Injectable()
export class AnotherContestResolverService implements Resolve<Contest> {
  constructor(private router: Router,
              private store$: Store<any>,
              private message: MessageResolverService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Contest> {
    this.store$.dispatch(new ContestActions.GetContest(Number(route.params.contestId)));
    return this.waitForContestToDownload(Number(route.params.problemId));
  }

  waitForContestToDownload(problemId: number): Observable<Contest> {
    return this.store$.pipe(select(ContestSelectors.getContest()))
      .pipe(
        filter(contest => !!contest),
        take(1),
        tap(contest => {
          const problems = contest.problems;
          if (!this.message.isNavigated) {
            this.router.navigate([problems.filter(problem => problem.id === problemId)[0].href]).then(() => this.message.isNavigated = true);
          }
        }),
      );
  }
}
