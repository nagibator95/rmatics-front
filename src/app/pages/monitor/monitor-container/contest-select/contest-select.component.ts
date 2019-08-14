import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import {TableProblem} from '../monitor.types';

export interface IContestsState {
  [contestId: string]: boolean;
}

@Component({
  selector: 'app-contest-select',
  templateUrl: './contest-select.component.html',
  styleUrls: ['./contest-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestSelectComponent implements OnInit {
  @Input() problems: TableProblem[];
  @Input() contestIndexes: number[];

  @Output() change = new EventEmitter<IContestsState>();
  isDropDownShown = false;
  isAllContestsChecked = true;
  state: IContestsState = {};
  currentState: IContestsState = {};
  isResetFilterNeeded = false;
  // @ts-ignore
  pluralize = require('pluralize-ru');
  nameMap: {[position: string]: number} = {};

  constructor() { }

  ngOnInit() {
    this.resetState();
    this.contestIndexes.forEach(contestId => {
      this.nameMap[contestId] = parseInt(this.problems.filter(problem => problem.contestId === contestId)[0].name, 10);
    });
  }

  initState() {
    this.contestIndexes.forEach(index => {
      this.state[index] = true;
    });

    this.isAllContestsChecked = true;
    this.isResetFilterNeeded = false;
  }

  onDropDownButtonClicked() {
    if (this.isDropDownShown) {
      this.state = Object.assign({}, this.currentState);
      this.isAllContestsChecked = this.areAllContestsChecked(this.state);
    }

    this.toggleDropDown();
  }

  onResetButtonClicked() {
    this.resetState();
    this.change.emit(this.currentState);
  }

  onAllContestsChange(isChecked: boolean) {
    this.isAllContestsChecked = isChecked;

    if (isChecked) {
      this.setState(isChecked);
    } else if (this.areAllContestsChecked(this.state)) {
      this.setState(isChecked);
    }
  }

  onContestTickChange(isChecked: boolean, index: number) {
    this.state[index] = isChecked;

    this.isAllContestsChecked = this.areAllContestsChecked(this.state);
  }

  onApplyButtonClicked() {
    this.updateCurrentState();
    this.toggleDropDown();

    this.isResetFilterNeeded = !this.areAllContestsChecked(this.currentState);
    this.change.emit(this.currentState);
  }

  contestCheckedNum(): string {
    const num: number = Object.values(this.currentState).filter(isChecked => isChecked).length;

    return this.pluralize(num, '%d контестов', '%d контест', '%d контеста', '%d контестов');
  }

  private toggleDropDown() {
    this.isDropDownShown = !this.isDropDownShown;
  }

  private setState(isCheckedAll: boolean) {
    Object.keys(this.state).forEach(index => this.state[index] = isCheckedAll);
  }

  private areAllContestsChecked(state: IContestsState) {
    return Object.values(state).every(value => !!value);
  }

  private updateCurrentState() {
    this.currentState = Object.assign({}, this.state);
  }

  private resetState() {
    this.initState();
    this.updateCurrentState();
  }
}
