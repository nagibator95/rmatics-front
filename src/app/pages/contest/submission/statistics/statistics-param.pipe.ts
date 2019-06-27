import { Pipe, PipeTransform } from '@angular/core';

import {formatBytes} from '../../../../utils/formatBytes';

@Pipe({
  name: 'statisticsParam',
})
export class StatisticsParamPipe implements PipeTransform {
  private static isTime(field: string) {
    return field === 'realTime';
  }

  private static formatData(value?: string, isCondition?: boolean, field?: string): string {
    if (!field) {
      return value;
    }

    return  StatisticsParamPipe.isTime(field) ? value + (isCondition ? ' сек' : ' мс') : formatBytes(Number(value));
  }

  transform(value?: string, isCondition?: boolean, field?: string): string {
    return value ? StatisticsParamPipe.formatData(value, isCondition, field) : '–';
  }
}
