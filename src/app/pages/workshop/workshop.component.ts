import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { filter, take } from 'rxjs/operators';

import { ContestService } from '../contest/contest.service';
import { Contest } from '../contest/contest.types';

import { WorkshopService } from './workshop.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkshopComponent implements OnInit {
  workshop = this.workshopService.workshop;
  isFetching = this.workshopService.isFetching;
  contest = this.contestService.contest;

  constructor(
    private workshopService: WorkshopService,
    private router: Router,
    private route: ActivatedRoute,
    private contestService: ContestService,
  ) { }

   ngOnInit() {
    const workshopId = Number(this.route.snapshot.paramMap.get('workshopId'));
    this.workshopService.getWorkshop(workshopId);
    this.workshopService.workshop.subscribe(data => console.log(data));
  }

  onContestClicked(contestId: number) {
    this.workshopService.setFetching(true);
    this.contestService.getContest(contestId);
    this.contest
      .pipe(filter(Boolean), take(1))
      .subscribe(contest => {
        const problems = (contest as Contest).problems;
        if (problems.length > 0) {
          this.router.navigate(['contest', contestId, 'problem', problems[0].id]);
        }
      });
  }
}
