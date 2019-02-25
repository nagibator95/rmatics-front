import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FileDropDirective } from './file-drop.directive';
import { FileSizePipe } from './file-size.pipe';
import { IconComponent } from './icon/icon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    IconComponent,
    FileDropDirective,
    FileSizePipe,
  ],
  exports: [
    IconComponent,
    FileDropDirective,
    FileSizePipe,
  ],
})

export class SharedModule {
}
