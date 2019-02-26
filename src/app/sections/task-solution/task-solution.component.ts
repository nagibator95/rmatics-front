import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { languages } from '../../shared/constants';

export interface Language {
  id: number;
  title: string;
  mode: string;
}

@Component({
  selector: 'app-task-solution',
  templateUrl: './task-solution.component.html',
  styleUrls: ['./task-solution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TaskSolutionComponent {
  languages = languages;
  showFileLoader = true;
  selectedLanguage: Language | {} = {};
}
