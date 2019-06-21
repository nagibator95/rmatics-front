import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Problem, Submission } from '../../../core/stores/contest/types/contest.types';
import { languages, Language } from '../../../shared/constants';
import { UploadComponent } from '../../../ui/controls/upload/upload.component';

@Component({
  selector: 'app-contest-task',
  templateUrl: './contest-task.component.html',
  styleUrls: ['./contest-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ContestTaskComponent implements OnInit, OnDestroy {
  @ViewChild('upload') upload!: UploadComponent;

  @Input() problem: Problem = null;
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

  public formatBytes(bytes: number = this.memoryLimit, decimals = 2): string {
    if (bytes === 0) {
      return '0 B';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  constructor() {}

  ngOnInit() {
    const obj = JSON.parse(localStorage.getItem('code'));
    if (obj !== null && obj[this.problem.id]) {
      this.code = obj[this.problem.id];
    }
  }

  ngOnDestroy() {
    const obj = JSON.parse(localStorage.getItem('code'));
    obj[this.problem.id] = this.code;

    localStorage.setItem('code', JSON.stringify(obj));
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
