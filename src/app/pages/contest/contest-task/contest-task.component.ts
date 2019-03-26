import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { languages, Language } from '../../../shared/constants';
import { UploadComponent } from '../../../ui/controls/upload/upload.component';
import { Submission } from '../contest.types';

@Component({
  selector: 'app-contest-task',
  templateUrl: './contest-task.component.html',
  styleUrls: ['./contest-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ContestTaskComponent {
  @ViewChild('upload') upload!: UploadComponent;

  @Input() fileError = '';
  @Input() name = '';
  @Input() timeLimit = 0;
  @Input() memoryLimit = 0;
  @Input() input: string[] = [];
  @Input() correct: string[] = [];
  @Input() content = '';
  @Input() submissions: Submission[] = [];
  @Input() isSubmissionsFetching = false;

  @Output() selectFile = new EventEmitter();
  @Output() addSubmission = new EventEmitter();
  @Output() getSubmissions = new EventEmitter<number>();
  @Output() openSubmission = new EventEmitter();
  @Output() pass = new EventEmitter();

  code = '';
  languages = languages;
  showFileLoader = true;
  selectedLanguage: Language = { ...languages[0] } as Language;
  selectedFile?: File;

  constructor() {
  }

  get minDataLines() {
    return Math.max(this.input.length, this.correct.length);
  }

  select(file: File) {
    if (file !== undefined) {
      this.selectFile.emit();
    }
    this.selectedFile = file;
  }

  passSolution() {
    this.addSubmission.emit({
      file: this.showFileLoader
        ? this.selectedFile
        : new File([new Blob([this.code])], 'solution.code'),
      languageId: this.selectedLanguage.id,
    });
  }
}
