import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testsParam',
})
export class TestsParamPipe implements PipeTransform {

  transform(value?: string): string {
    return value ? value : '–';
  }

}
