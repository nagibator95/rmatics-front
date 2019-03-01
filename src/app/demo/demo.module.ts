import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlsModule } from '../controls/controls.module';

import { ButtonDemoComponent } from './button/button-demo.component';
import { CheckboxDemoComponent } from './checkbox/checkbox-demo.component';
import { DemoComponent } from './demo.component';
import { InputDemoComponent } from './input/input-demo.component';
import { RadioDemoComponent } from './radio/radio-demo.component';
import { SelectDemoComponent } from './select/select-demo.component';
import { UploadDemoComponent } from './upload/upload-demo.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    children: [
      { path: 'input', component: InputDemoComponent },
      { path: 'checkbox', component: CheckboxDemoComponent },
      { path: 'button', component: ButtonDemoComponent },
      { path: 'radio', component: RadioDemoComponent },
      { path: 'upload', component: UploadDemoComponent },
      { path: 'select', component: SelectDemoComponent },
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
    UploadDemoComponent,
    SelectDemoComponent,
  ],
  exports: [
    DemoComponent,
    InputDemoComponent,
    CheckboxDemoComponent,
    ButtonDemoComponent,
    RadioDemoComponent,
    UploadDemoComponent,
    SelectDemoComponent,
  ],
})

export class DemoModule {
}
