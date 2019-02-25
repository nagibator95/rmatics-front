import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlsModule } from '../controls/controls.module';
import { SectionsModule } from '../sections/sections.module';

import { ButtonDemoComponent } from './button/button-demo.component';
import { CheckboxDemoComponent } from './checkbox/checkbox-demo.component';
import { DemoComponent } from './demo.component';
import { InputDemoComponent } from './input/input-demo.component';
import { RadioDemoComponent } from './radio/radio-demo.component';
import { TaskMainDemoComponent } from './task-main/task-main-demo.component';
import { TaskMenuDemoComponent } from './task-menu/task-menu-demo.component';
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
      { path: 'task-menu', component: TaskMenuDemoComponent },
      { path: 'upload', component: UploadDemoComponent },
      { path: 'task-main', component: TaskMainDemoComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ControlsModule,
    SectionsModule,
  ],
  declarations: [
    DemoComponent,
    InputDemoComponent,
    CheckboxDemoComponent,
    TaskMenuDemoComponent,
    ButtonDemoComponent,
    RadioDemoComponent,
    TaskMainDemoComponent,
    UploadDemoComponent,
  ],
  exports: [
    DemoComponent,
    InputDemoComponent,
    CheckboxDemoComponent,
    TaskMenuDemoComponent,
    ButtonDemoComponent,
    RadioDemoComponent,
    UploadDemoComponent,
    TaskMainDemoComponent,
  ],
})

export class DemoModule {
}
