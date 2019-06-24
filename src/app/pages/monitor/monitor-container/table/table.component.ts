import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { TableProblem, TableType, TableUser } from '../monitor.types';
import { nameCompare, problemCompare, totalScoreCompare } from '../table-sort';

type TooltipData = {
  contestName: string,
  fullname: string,
  summary: string,
};

type TooltipPosition = {
  top: number,
  left: number,
  orientation: 'right' | 'left',
};

type SortState = {
  fieldId: string | number,
  reverse: boolean,
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  @Input() problems: TableProblem[] = [];
  @Input() users: TableUser[] = [];
  @Input() type: TableType = TableType.IOI;

  @ViewChildren('col') private cols: QueryList<ElementRef<HTMLTableCellElement>> = new QueryList();

  isScrolled = false;

  tooltipData: TooltipData | null = null;
  tooltipPosition: TooltipPosition = {top: 0, left: 0, orientation: 'left'};

  sortState: SortState = {
    fieldId: 'totalScore',
    reverse: false,
  }

  constructor() { }

  ngOnInit() {
  }

  @HostListener('mousemove', ['$event']) onMouseMove($event: MouseEvent) {
    const colHover = $event.target ? ($event.target as HTMLElement).closest('td, th') as HTMLTableCellElement : null;

    this.cols.forEach(col => {
      const status = col.nativeElement.querySelector('app-status');
      col.nativeElement.classList.remove('col_hover');

      if (
        colHover &&
        !colHover.className.includes('col_head') &&
        (
          col.nativeElement.parentNode === colHover.parentNode ||
          (
            col.nativeElement.cellIndex === colHover.cellIndex &&
            !colHover.className.includes('col_sticky')
          )
        )
      ) {
        col.nativeElement.classList.add('col_highlighted');
        if (status) status.classList.add('_highlighted');
      } else {
        col.nativeElement.classList.remove('col_highlighted', 'col_hover');
        if (status) status.classList.remove('_highlighted');
      }
    });

    if (colHover) {
      colHover.classList.add('col_hover');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.cols.forEach(col => {
      const status = col.nativeElement.querySelector('app-status');
      col.nativeElement.classList.remove('col_highlighted', 'col_hover');
      if (status) status.classList.remove('_highlighted');
    })
  }

  onScroll(val: number) {
    this.isScrolled = Boolean(val);
  }

  showTooltip(e: MouseEvent, data: TooltipData) {
    const tooltipOffset = 18;
    const tooltipWidth = 288;
    const button = e.target ? (e.target as HTMLElement).closest('button') : null;

    if (!button || !data) {
      this.hideTooltip();
      return;
    }

    const {top, left} = button.getBoundingClientRect();
    const offsetLeft = left + tooltipOffset;
    const toRight = offsetLeft + tooltipWidth > window.innerWidth;

    const finalPosition: TooltipPosition = {
      top: top + button.offsetHeight - 8,
      left: toRight ? left + button.offsetWidth - tooltipOffset - tooltipWidth : offsetLeft,
      orientation: toRight ? 'right' : 'left'
    }
  
    this.tooltipPosition = finalPosition;
    this.tooltipData = data;
  }

  hideTooltip() {
    this.tooltipData = null;
  }

  sortTable(id: string | number) {
    const reverse = id === this.sortState.fieldId && !this.sortState.reverse;

    switch (id) {
      case 'name':
        this.users.sort(nameCompare(reverse));
      case 'totalScore':
        this.users.sort(totalScoreCompare(this.type, reverse));
      default:
        this.users.sort(problemCompare(this.problems.findIndex(problem => problem.id === id), reverse));
    }

    this.sortState = {
      fieldId: id,
      reverse,
    }
  }

  isReversed(id: string | number): boolean {
    return this.sortState.fieldId === id && this.sortState.reverse;
  }

}
