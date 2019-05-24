import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContestApi } from 'src/app/shared/types/contest.types';

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
    private route: ActivatedRoute,
  ) { }

   ngOnInit() {
    const workshopId = Number(this.route.snapshot.paramMap.get('workshopId'));
    this.workshopService.getWorkshop(workshopId);
    this.workshopService.workshop.subscribe(data => console.log(data));
  }

  onContestClicked(contest: ContestApi) {
    this.workshopService.setFetching(true);
    this.router.navigate(['contest', {id: contest.id}]);
  }
}
