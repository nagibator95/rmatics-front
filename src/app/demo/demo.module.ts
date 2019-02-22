import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlsModule } from '../controls/controls.module';

import { ButtonDemoComponent } from './button/button-demo.component';
import { CheckboxDemoComponent } from './checkbox/checkbox-demo.component';
import { DemoComponent } from './demo.component';
import { InputDemoComponent } from './input/input-demo.component';
import { RadioDemoComponent } from './radio/radio-demo.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    children: [
      { path: 'input', component: InputDemoComponent },
      { path: 'checkbox', component: CheckboxDemoComponent },
      { path: 'button', component: ButtonDemoComponent },
      { path: 'radio', component: RadioDemoComponent },
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
    ButtonDemoComponent,
    RadioDemoComponent,
  ],
  exports: [
    DemoComponent,
    InputDemoComponent,
    CheckboxDemoComponent,
    ButtonDemoComponent,
    RadioDemoComponent,
  ],
})

export class DemoModule {
}
