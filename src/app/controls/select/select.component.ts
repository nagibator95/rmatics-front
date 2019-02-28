import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SelectComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() value?: string | number = undefined;
  @Output() valueChange = new EventEmitter<string | number>();
  @Input() item?: any = undefined;
  @Output() itemChange = new EventEmitter<any>();
  @Input() valueField = 'value';
  @Input() labelField = 'label';

  selectedItem: any;

  @ViewChild('button') button?: ElementRef;
  active = fromEvent(window.document, 'click').pipe(
    map(event => this.button ? this.button.nativeElement.contains(event.target) : false),
  );

  constructor() {}

  select(item: any) {
    this.selectedItem = item;
    this.value = item[this.valueField];
    this.valueChange.emit(this.value);
    this.itemChange.emit(item);
  }

  ngOnInit() {
    if (this.items.length > 0) {
      this.selectedItem = this.items[0];
      this.value = this.selectedItem[this.valueField];
      this.valueChange.emit(this.value);
      this.itemChange.emit(this.items[0]);
    } else {
      this.selectedItem = {};
    }
  }
}
