import { Observable } from 'rxjs';
import { ModalContent } from 'src/app/modal/modal-content';
import { getDate } from 'src/app/utils/getDate';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Submission } from '../contest.types';

interface SubmissionComponentInput {
  submission: Observable<Submission | undefined>;
  isFetching: Observable<boolean>;
}

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionComponent extends ModalContent<SubmissionComponentInput> {
  submission = this.data.submission;
  isFetching = this.data.isFetching;

  getDate = getDate;

  tabs = [
    {
      text: 'Код посылки',
      id: 'submission_code',
      current: true,
    }, {
      text: 'Протокол',
      id: 'protocol',
      current: false,
    },
  ];

  activeTab: string = this.tabs[0].id;
}
