import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

import {ContestSolutionsWays} from '../../../core/enum/contest-solutions-ways.enum';
import {languages, ILanguage} from '../../../shared/constants';
import {IRadioButton} from '../../../ui/radio-group/radio-group.component';

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
    selectedLanguage: ILanguage = {...languages[0]};
    radioButtons: IRadioButton[] = [
        {
            text: ContestSolutionsWays.UploadFile,
            onClickHandler: () => (this.showFileLoader = true),
        },
        {
            text: ContestSolutionsWays.WriteCode,
            onClickHandler: () => (this.showFileLoader = false),
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
