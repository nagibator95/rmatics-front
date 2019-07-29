import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import {RouterActions} from '../../../core/stores/router';
import {WorkshopService} from '../workshop/workshop.service';

import {JoinService} from './join.service';

enum JoinMessages {
  Success = 'Вы успешно записались на сбор. Теперь преподаватель должен подтвердить ваше участие.',
  Error = 'Произошла ошибка во время регистрации на сбор.',
}

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private joinService: JoinService,
              private workshopService: WorkshopService,
              private store$: Store<any>) {}

  ngOnInit() {
    const workshopId = Number(this.route.snapshot.paramMap.get('workshopId'));
    const workshopToken = this.route.snapshot.queryParamMap.get('token');
    this.joinService.join(workshopId, workshopToken).subscribe(
      () => this.workshopService.joinMessage.next(JoinMessages.Success),
      () => this.workshopService.joinMessage.next(JoinMessages.Error),
      () => this.store$.dispatch(new RouterActions.Go({path: [`workshop/${workshopId}`]})));
  }
}
