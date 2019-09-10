import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';

import {CONTEST_STORE} from './contest-store.module';
import {IContestData, IContestState} from './models/models';
import {
    IContest,
    IProblem,
    IRunComment,
    IRunProtocol,
    IRunSource,
    ISubmission,
} from './types/contest.types';

export const featureSelector = createFeatureSelector<IContestState>(CONTEST_STORE);

export function getIsFetching(): MemoizedSelector<IContestState, boolean> {
    return createSelector(
        featureSelector,
        state => state.isFetching || null,
    );
}

export function getError(): MemoizedSelector<IContestState, string> {
    return createSelector(
        featureSelector,
        state => state.error || null,
    );
}

export function getContest(): MemoizedSelector<IContestState, IContest> {
    return createSelector(
        featureSelector,
        state => state.contest || null,
    );
}

export function getSubmissions(): MemoizedSelector<IContestState, ISubmission[]> {
    return createSelector(
        featureSelector,
        state => state.submissions || null,
    );
}

export function getContestData(): MemoizedSelector<IContestState, IContestData> {
    return createSelector(
        featureSelector,
        state => state.contestData || null,
    );
}

export function getProblem(): MemoizedSelector<IContestState, IProblem> {
    return createSelector(
        featureSelector,
        state => state.problem || null,
    );
}

export function getIsSubmissionFetching(): MemoizedSelector<IContestState, boolean> {
    return createSelector(
        featureSelector,
        state => state.isSubmissionsFetching || null,
    );
}

export function getFileError(): MemoizedSelector<IContestState, string> {
    return createSelector(
        featureSelector,
        state => state.fileError || null,
    );
}

export function getIsProtocolFetching(): MemoizedSelector<IContestState, boolean> {
    return createSelector(
        featureSelector,
        state => state.submissionState.protocol.isFetching || null,
    );
}

export function getIsSourceFetching(): MemoizedSelector<IContestState, boolean> {
    return createSelector(
        featureSelector,
        state => state.submissionState.source.isFetching || null,
    );
}

export function getAreCommentsFetching(): MemoizedSelector<IContestState, boolean> {
    return createSelector(
        featureSelector,
        state => state.submissionState.comments.isFetching || null,
    );
}

export function getProtocol(): MemoizedSelector<IContestState, IRunProtocol> {
    return createSelector(
        featureSelector,
        state => {
            const data = state.submissionState.protocol.data;

            if (data) {
                if (data.compilerOutput) {
                    data.compilerOutput = data.compilerOutput.trim();
                }

                return data;
            } else {
                return null;
            }
        },
    );
}

export function getSource(): MemoizedSelector<IContestState, IRunSource> {
    return createSelector(
        featureSelector,
        state => state.submissionState.source.data || null,
    );
}

export function getComments(): MemoizedSelector<IContestState, IRunComment[]> {
    return createSelector(
        featureSelector,
        state => state.submissionState.comments.data || null,
    );
}

export function getSubmissionPreview(): MemoizedSelector<IContestState, ISubmission> {
    return createSelector(
        featureSelector,
        state => state.submissionPreview || null,
    );
}
