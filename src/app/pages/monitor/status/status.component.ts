import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { TableType } from '../monitor.types';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusComponent implements OnInit {
  @Input() onTesting: boolean = false;
  @Input() isIgnored: boolean = false;
  @Input() isBestResult: boolean = false;
  @Input() mark: string = '';
  @Input() time: number = 0;
  @Input() success: boolean = false;
  @Input() wrongTries: number = 0;
  @Input() tableType: TableType = TableType.IOI;

  constructor() { }

  ngOnInit() {
  }

  get mainText() {
    if (this.onTesting) {
      return '?';
    }
    if (this.tableType === TableType.IOI) {
      return this.mark;
    }

    return `${this.success ? '+' : '-'}${this.wrongTries ? this.wrongTries : ''}`
  }

  get status() {
    if (this.isBestResult) return 'best';
    if (this.isIgnored) return 'failed';
    if (this.onTesting) return 'testing';
    if (this.tableType === TableType.IOI) {
      const score = Number(this.mark);

      if (!score) return 'failed';

      return score >= 81 ? 'success' : 'warning';
    }
    return this.success ? 'success' : 'failed';
  }

}
