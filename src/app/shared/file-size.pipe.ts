import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
})

export class FileSizePipe implements PipeTransform {
  transform(bytes: number, decimals: number = 0): string {
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    if (bytes === 0) {
      return '0 Б';
    }

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
