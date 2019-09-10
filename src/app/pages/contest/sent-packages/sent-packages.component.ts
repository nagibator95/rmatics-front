import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import dayjs from 'dayjs';
import {getDate} from 'src/app/utils/getDate';

import {
    IShowSubmission,
    ISubmission,
} from '../../../core/stores/contest/types/contest.types';

type sortFields = 'date' | 'score';

interface ILastSorted {
    field: sortFields;
    reverse: boolean;
}

const convert = (field: sortFields, val: ISubmission): number =>
    field === 'date' ? dayjs(val[field]).valueOf() : val[field];

@Component({
    selector: 'app-sent-packages',
    templateUrl: './sent-packages.component.html',
    styleUrls: ['./sent-packages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentPackagesComponent {
    private _submisions: ISubmission[] = [];
    get submissions(): ISubmission[] {
        return this._submisions;
    }

    @Input('submissions')
    set submissions(value: ISubmission[]) {
        this.isSubmissionsListFull = value.length === 0 || value.length % 5 !== 0;
        this._submisions = value.sort(
            this.compare(this.lastSorted.field, this.lastSorted.reverse),
        );
    }
    @Input() isFetching = false;
    @Input() problemId!: number;
    @Input() contestId: number;
    @Output() updateSubmissions = new EventEmitter<number>();
    @Output() openSubmission = new EventEmitter<IShowSubmission>();

    getDate = getDate;
    lastSorted: ILastSorted = {field: 'date', reverse: false};
    page = 1;
    isSubmissionsListFull = false;

    constructor() {}

    get sortedDate() {
        return this.lastSorted.field === 'date' && this.lastSorted.reverse;
    }

    get sortedScore() {
        return this.lastSorted.field === 'score' && this.lastSorted.reverse;
    }

    compare = (field: sortFields, reverse = false) => (
        a: ISubmission,
        b: ISubmission,
    ): number => {
        this.lastSorted = {field, reverse};

        const val1 = convert(field, a);
        const val2 = convert(field, b);

        const diff = val1 - val2;

        if (diff === 0) {
            return (reverse ? 1 : -1) * a.id - b.id;
        }

        return (reverse ? 1 : -1) * diff;
    };

    update() {
        this.updateSubmissions.emit(this.page);
    }

    checkForUpdates() {
        this.updateSubmissions.emit(1);
        this.page = 1;
    }

    changePageSize() {
        this.page += 1;
        this.update();
    }

    handleSort = (field: sortFields) => {
        const reverse =
            this.lastSorted.field === field ? !this.lastSorted.reverse : false;

        this.lastSorted = {field, reverse};
        this.submissions = this.submissions.sort(this.compare(field, reverse));
    };

    showSubmission(runId: number) {
        this.openSubmission.emit({
            contestId: this.contestId,
            problemId: this.problemId,
            runId,
        });
    }
}
