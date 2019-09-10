import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ControlsModule} from '../../ui/controls/controls.module';
import {UiModule} from '../../ui/ui.module';

import {AccordionDemoComponent} from './accordion/accordion-demo.component';
import {ButtonDemoComponent} from './button/button-demo.component';
import {CheckboxDemoComponent} from './checkbox/checkbox-demo.component';
import {DemoComponent} from './demo.component';
import {InputDemoComponent} from './input/input-demo.component';
import {RadioGroupDemoComponent} from './radio-group-demo/radio-group-demo.component';
import {RadioDemoComponent} from './radio/radio-demo.component';
import {SelectDemoComponent} from './select/select-demo.component';
import {TabsDemoComponent} from './tabs/tabs-demo.component';
import {UploadDemoComponent} from './upload/upload-demo.component';

const routes: Routes = [
    {
        path: '',
        component: DemoComponent,
        children: [
            {path: 'input', component: InputDemoComponent},
            {path: 'checkbox', component: CheckboxDemoComponent},
            {path: 'button', component: ButtonDemoComponent},
            {path: 'radio', component: RadioDemoComponent},
            {path: 'upload', component: UploadDemoComponent},
            {path: 'select', component: SelectDemoComponent},
            {path: 'tabs', component: TabsDemoComponent},
            {path: 'radioGroup', component: RadioGroupDemoComponent},
            {path: 'accordion', component: AccordionDemoComponent},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), ControlsModule, UiModule],
    declarations: [
        DemoComponent,
        InputDemoComponent,
        CheckboxDemoComponent,
        ButtonDemoComponent,
        RadioDemoComponent,
        UploadDemoComponent,
        SelectDemoComponent,
        TabsDemoComponent,
        RadioGroupDemoComponent,
        AccordionDemoComponent,
    ],
    exports: [
        DemoComponent,
        InputDemoComponent,
        CheckboxDemoComponent,
        ButtonDemoComponent,
        RadioDemoComponent,
        UploadDemoComponent,
        SelectDemoComponent,
        RadioGroupDemoComponent,
        AccordionDemoComponent,
    ],
})
export class DemoModule {}
