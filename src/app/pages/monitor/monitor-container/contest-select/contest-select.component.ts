import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-contest-select',
  templateUrl: './contest-select.component.html',
  styleUrls: ['./contest-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestSelectComponent implements OnInit {
  @Input() contestIndexes = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4];
  constructor() { }

  ngOnInit() {}
}
