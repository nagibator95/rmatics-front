import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlsModule } from '../controls/controls.module';

import { DemoComponent } from './demo.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ControlsModule,
  ],
  declarations: [
    DemoComponent,
  ],
  exports: [
    DemoComponent,
  ],
})

export class DemoModule {
}
