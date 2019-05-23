import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ContestApi} from '../contest/contest.types';

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

  constructor(
    private workshopService: WorkshopService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.workshopService.getWorkshop(1);
    this.workshopService.workshop.subscribe(data => console.log(data));
  }

  onContestClicked(contest: ContestApi) {
    this.workshopService.setFetching(true);
    this.router.navigate(['contest', {id: contest.id}]);
  }
}
