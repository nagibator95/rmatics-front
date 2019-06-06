import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { getDate } from 'src/app/utils/getDate';

import {ContestSelectors} from '../../../core/stores/contest';
import {SubmissionService} from '../../../core/stores/contest/services/submission.service';
import {
  Problem,
  RunComment,
  RunProtocol,
  RunSource,
  Submission,
} from '../../../core/stores/contest/types/contest.types';
import {ModalContent} from '../../../modal/modal-content';
import {Tab} from '../../../ui/tabs/tabs.component';

interface SubmissionComponentInput {
  submissionService: SubmissionService;
}

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionComponent extends ModalContent<SubmissionComponentInput> implements OnInit, OnDestroy {
  protocol: Observable<RunProtocol>;
  source: Observable<RunSource>;
  problem: Observable<Problem>;
  comments: Observable<RunComment[]>;
  submissionPreview: Observable<Submission>;

  isSubmissionsFetching: Observable<boolean>;
  isProtocolFetching: Observable<boolean>;
  isSourceFetching: Observable<boolean>;
  areCommentsFetching: Observable<boolean>;

  getDate = getDate;

  activeTab = 'submission_code';
  tabs: Tab[] = [
    {
      text: 'Код посылки',
      id: 'submission_code',
      current: true,
    },
  ];
  private readonly destroy$ = new Subject();

  constructor(private store$: Store<any>) {
    super();
  }

  ngOnInit() {
    this.protocol = this.store$.pipe(select(ContestSelectors.getProtocol()), takeUntil(this.destroy$));
    this.source = this.store$.pipe(select(ContestSelectors.getSource()), takeUntil(this.destroy$));
    this.comments = this.store$.pipe(select(ContestSelectors.getComments()), takeUntil(this.destroy$));
    this.problem = this.store$.pipe(select(ContestSelectors.getProblem()), takeUntil(this.destroy$));
    this.submissionPreview = this.store$.pipe(select(ContestSelectors.getSubmissionPreview()), takeUntil(this.destroy$));
    this.isSubmissionsFetching = this.store$.pipe(select(ContestSelectors.getIsSubmissionFetching()), takeUntil(this.destroy$));
    this.isProtocolFetching = this.store$.pipe(select(ContestSelectors.getIsProtocolFetching()), takeUntil(this.destroy$));
    this.isSourceFetching = this.store$.pipe(select(ContestSelectors.getIsSourceFetching()), takeUntil(this.destroy$));
    this.areCommentsFetching = this.store$.pipe(select(ContestSelectors.getAreCommentsFetching()), takeUntil(this.destroy$));

    this.protocol.subscribe((value: RunProtocol | undefined) => {
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTabClick(event: string) {
    this.activeTab = event;
  }
}
