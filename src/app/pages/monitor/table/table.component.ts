import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { body, head } from './data';

type HeadCol = {
  name: string,
  id: string,
  sortable?: boolean,
};

type TooltipData = {
  contest: string,
  problem: string,
  description?: string,
};

type TooltipPosition = {
  top: number,
  left: number,
  orientation: 'right' | 'left',
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  head: HeadCol[] = head;
  body = body;
  iterableCols = Object.keys(body[0]).filter(key => !['rating', 'name', 'from', 'total'].includes(key));

  @ViewChildren('col') private cols: QueryList<ElementRef<HTMLTableCellElement>> = new QueryList();

  isScrolled = false;

  tooltipData: TooltipData | null = null;
  tooltipPosition: TooltipPosition = {top: 0, left: 0, orientation: 'left'};

  constructor() { }

  ngOnInit() {
  }

  @HostListener('mousemove', ['$event']) onMouseMove($event: MouseEvent) {
    const colHover = $event.target ? ($event.target as HTMLElement).closest('td, th') as HTMLTableCellElement : null;

    this.cols.forEach(col => {
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
        col.nativeElement.classList.add('col_highlited');
      } else {
        col.nativeElement.classList.remove('col_highlited', 'col_hover');
      }
    });

    if (colHover) {
      colHover.classList.add('col_hover');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.cols.forEach(col => col.nativeElement.classList.remove('col_highlited', 'col_hover'))
  }

  onScroll(val: number) {
    this.isScrolled = Boolean(val);
  }

  isStickyCol(col: HeadCol) {
    return col.id === 'total' || !this.iterableCols.includes(col.id);
  }

  isSortable(col: HeadCol) {
    return col.id !== 'rating';
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

}
