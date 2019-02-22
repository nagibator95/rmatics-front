import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlsModule } from '../controls/controls.module';
import { SectionsModule } from '../sections/sections.module';

import { CheckboxDemoComponent } from './checkbox/checkbox-demo.component';
import { DemoComponent } from './demo.component';
import { InputDemoComponent } from './input/input-demo.component';
import { TaskMenuDemoComponent } from './task-menu/task-menu-demo.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    children: [
      {path: 'controls/input', component: InputDemoComponent},
      {path: 'controls/checkbox', component: CheckboxDemoComponent},
      {path: 'sections/task-menu', component: TaskMenuDemoComponent},
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
  ],
  exports: [
    DemoComponent,
    InputDemoComponent,
    CheckboxDemoComponent,
    TaskMenuDemoComponent,
  ],
})

export class DemoModule {
}
