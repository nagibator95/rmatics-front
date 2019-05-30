import { Injectable } from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {of} from 'rxjs';
import {delay, tap} from 'rxjs/operators';

@Injectable()
export class ContestResolverService implements Resolve<{content: string}> {
  constructor(private router: Router) { }

  resolve() {
    return of({content: 'Misery'}).pipe(delay(2000), tap(() => this.router.navigate(['contest', 2, 'problem', 2936])));
  }
}
