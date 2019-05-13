import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FileDropDirective } from './file-drop.directive';
import { FileSizePipe } from './file-size.pipe';
import { IconComponent } from './icon/icon.component';
import { LoaderComponent } from './loader/loader.component';
import { NoEncapsulationComponent } from './no-encapsulation/no-encapsulation.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { WhiteBlockComponent } from './white-block/white-block.component';

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
    LoaderComponent,
    NoEncapsulationComponent,
    WhiteBlockComponent,
  ],
  exports: [
    IconComponent,
    FileDropDirective,
    FileSizePipe,
    SafeHtmlPipe,
    LoaderComponent,
    NoEncapsulationComponent,
    WhiteBlockComponent,
  ],
})

export class SharedModule {
}
