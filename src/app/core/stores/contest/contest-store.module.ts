import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {ContestEffects} from './contest.effects';
import {contestReducer} from './contest.reducer';
import {ContestService} from './services/contest.service';
import {SubmissionService} from './services/submission.service';

export const CONTEST_STORE = 'CONTEST_STORE';

@NgModule({
    declarations: [],
    imports: [
        EffectsModule.forFeature([ContestEffects]),
        StoreModule.forFeature(CONTEST_STORE, contestReducer),
    ],
    providers: [ContestService, SubmissionService],
})
export class ContestStoreModule {}
