import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription} from 'rxjs';
import { ContestApi } from 'src/app/shared/types/contest.types';

import { WorkshopService } from './workshop.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkshopComponent implements OnInit, OnDestroy {
  workshop = this.workshopService.workshop;
  isFetching = this.workshopService.isFetching;

  workshopSubscription: Subscription;

  constructor(
    private workshopService: WorkshopService,
    private router: Router,
  ) {}

   ngOnInit() {
    const workshopId = Number(this.router.routerState.snapshot.root.children[0].paramMap.get('workshopId'));
    this.workshopService.getWorkshop(workshopId);
    this.workshopSubscription = this.workshop.subscribe(data => console.log(data));
  }

  ngOnDestroy() {
    this.workshopSubscription.unsubscribe();
  }

  onContestClicked(contest: ContestApi) {
    this.workshopService.setFetching(true);
    this.router.navigate(['contest', contest.id]);
  }
}
