import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IContestApi} from 'src/app/shared/types/contest.types';

import {WorkshopService} from './workshop.service';

@Component({
    selector: 'app-workshop',
    templateUrl: './workshop.component.html',
    styleUrls: ['./workshop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkshopComponent implements OnInit {
    workshop = this.workshopService.workshop;
    isFetching = this.workshopService.isFetching;

    constructor(private workshopService: WorkshopService, private router: Router) {}

    ngOnInit() {
        const workshopId = Number(
            this.router.routerState.snapshot.root.children[0].paramMap.get('workshopId'),
        );

        this.workshopService.getWorkshop(workshopId);
    }

    onContestClicked(contest: IContestApi) {
        if (this.hasContestStarted(contest.time_start)) {
            this.workshopService.setFetching(true);
            this.router.navigate(['contest', contest.id]);
        }
    }

    hasContestStarted(time: string): boolean {
        return new Date(time) < new Date();
    }

    sortContests(contests: IContestApi[]): IContestApi[] {
        return contests.sort(
            (contest1, contest2) => contest1.position - contest2.position,
        );
    }
}
