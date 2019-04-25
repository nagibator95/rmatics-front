import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import { ModalContent } from 'src/app/modal/modal-content';
import { getDate } from 'src/app/utils/getDate';

import {Tab} from '../../../ui/tabs/tabs.component';
import { RunProtocol } from '../contest.types';
import { SubmissionService } from '../submission.service';

interface SubmissionComponentInput {
  submissionService: SubmissionService;
}

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionComponent extends ModalContent<SubmissionComponentInput> implements OnInit {
  submissionService = this.data.submissionService;
  submissionPreview = this.submissionService.submissionPreview;
  protocol = this.submissionService.protocol;
  source = this.submissionService.source;
  problem = this.submissionService.problem;
  comments = this.submissionService.comments;

  isSubmissionsFetching = this.submissionService.isSubmissionsFetching;
  isProtocolFetching = this.submissionService.isProtocolFetching;
  isSourceFetching = this.submissionService.isSourceFetching;
  areCommentsFetching = this.submissionService.areCommentsFetching;

  getDate = getDate;

  activeTab = 'submission_code';
  tabs: Tab[] = [
    {
      text: 'Код посылки',
      id: 'submission_code',
      current: true,
    },
  ];

  ngOnInit() {
    this.protocol.subscribe((value: RunProtocol) => {
      if (value) {
        this.tabs = [
          {
            text: 'Код посылки',
            id: 'submission_code',
            current: true,
          },
          {
            text: 'Протокол',
            id: 'protocol',
            current: false,
          },
        ];
      }
    });
  }

  onTabClick(event: string) {
    this.activeTab = event;
  }
}
