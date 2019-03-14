import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { ContestSolutionsWays } from '../../core/enum/contest-solutions-ways.enum';
import { languages, Language } from '../../shared/constants';
import { RadioButton } from '../../ui/radio-group/radio-group.component';

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
  radioButtons: RadioButton[] = [
    {
      text: ContestSolutionsWays.UploadFile,
      onClickHandler: () => this.showFileLoader = true,
    },
    {
      text: ContestSolutionsWays.WriteCode,
      onClickHandler: () => this.showFileLoader = false,
    },
  ];

  @Output() pass = new EventEmitter();

  passSolution() {
    this.pass.emit({
      code: this.code,
      languageId: this.selectedLanguage.id,
    });
  }
}
