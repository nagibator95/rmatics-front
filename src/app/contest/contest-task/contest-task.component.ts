import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Submission } from '../contest.types';

@Component({
  selector: 'app-contest-task',
  templateUrl: './contest-task.component.html',
  styleUrls: ['./contest-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ContestTaskComponent {
  @Input() name = '';
  @Input() timeLimit = 0;
  @Input() memoryLimit = 0;
  @Input() input: string[] = [];
  @Input() correct: string[] = [];
  @Input() content = '';
  @Input() submissions: Submission[] = [];

  @Output() addSubmission = new EventEmitter();
  @Output() getSubmissions = new EventEmitter();
  @Output() openSubmission = new EventEmitter();

  constructor() {
  }

  get minDataLines() {
    return Math.max(this.input.length, this.correct.length);
  }

  addSolution(data: { code: string, languageId: number }) {
    this.addSubmission.emit(data);
  }
}
