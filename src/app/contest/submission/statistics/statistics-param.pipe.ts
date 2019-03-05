import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statisticsParam',
})
export class StatisticsParamPipe implements PipeTransform {

  transform(value?: string): string {
    return value ? value : '–';
  }

}
