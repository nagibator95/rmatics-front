import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlsModule } from '../controls/controls.module';

import { DemoComponent } from './demo.component';
import { InputDemoComponent } from './input/input-demo.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    children : [
      { path: 'input', component: InputDemoComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ControlsModule,
  ],
  declarations: [
    DemoComponent,
    InputDemoComponent,
  ],
  exports: [
    DemoComponent,
    InputDemoComponent,
  ],
})

export class DemoModule {
}
