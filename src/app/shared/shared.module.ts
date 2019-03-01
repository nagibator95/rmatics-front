import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FileDropDirective } from './file-drop.directive';
import { FileSizePipe } from './file-size.pipe';
import { IconComponent } from './icon/icon.component';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    IconComponent,
    FileDropDirective,
    FileSizePipe,
    SafeHtmlPipe,
  ],
  exports: [
    IconComponent,
    FileDropDirective,
    FileSizePipe,
    SafeHtmlPipe,
  ],
})

export class SharedModule {
}
