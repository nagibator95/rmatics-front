import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlsModule } from '../controls/controls.module';

import { CheckboxDemoComponent } from './checkbox/checkbox-demo.component';
import { DemoComponent } from './demo.component';
import { InputDemoComponent } from './input/input-demo.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    children: [
      { path: 'input', component: InputDemoComponent },
      { path: 'checkbox', component: CheckboxDemoComponent },
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
    CheckboxDemoComponent,
  ],
  exports: [
    DemoComponent,
    InputDemoComponent,
    CheckboxDemoComponent,
  ],
})

export class DemoModule {
}
