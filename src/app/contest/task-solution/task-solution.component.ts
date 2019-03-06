import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { languages, Language } from '../../shared/constants';

@Component({
  selector: 'app-task-solution',
  templateUrl: './task-solution.component.html',
  styleUrls: ['./task-solution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TaskSolutionComponent {
  code = '';
  languages = languages;
  showFileLoader = true;
  selectedLanguage: Language = { ...languages[0] };

  @Output() pass = new EventEmitter();

  passSolution() {
    this.pass.emit({
      code: this.code,
      languageId: this.selectedLanguage.id,
    });
  }
}
