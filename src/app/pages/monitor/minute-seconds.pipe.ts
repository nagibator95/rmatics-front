import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {

  transform(initialValue: number): string {
    const negative = initialValue < 0;
    const value = Math.floor(Math.abs(initialValue / 1000));
    const minutes: number = Math.floor(value / 60);
    return `${negative ? '-' : ''}${minutes.toString().padStart(2, '0')}:${(value - minutes * 60).toString().padStart(2, '0')}`;
  }

}
