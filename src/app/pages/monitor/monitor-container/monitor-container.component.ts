import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';

import {IContestsState} from './contest-select/contest-select.component';
import {MonitorService} from './monitor.service';
import {TableProblem} from './monitor.types';

@Component({
  selector: 'app-monitor-container',
  templateUrl: './monitor-container.component.html',
  styleUrls: ['./monitor-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorContainerComponent implements OnInit {
  monitor = this.monitorService.monitor;
  initialProblems: TableProblem[] = [];
  contestsState: IContestsState;
  contestIndexes: number[];

  constructor(
    private monitorService: MonitorService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.monitor.subscribe(monitor => {
      this.initialProblems = monitor ? monitor.problems : [];
      this.contestIndexes = this.getContestIds();
    });

    this.monitorService.setMonitor(null);
    const workshopId = Number(this.router.routerState.snapshot.root.children[0].paramMap.get('workshopId'));
    this.monitorService.getMonitor(workshopId);
  }

  onContestStateChanged(state: IContestsState) {
    this.contestsState = state;
  }

  getContestIds(): number[] {
    return this.initialProblems.map(problem => problem.contestId).filter((x, i, a) => a.indexOf(x) === i);
  }
}
