import {Injectable} from '@angular/core';
import {DomService, IChildConfig} from './dom.service';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor(private domService: DomService) {}

    private modalElementId = 'message-box';

    showNotification(
        component: any,
        inputs?: {[key: string]: any},
        outputs?: {[key: string]: any},
    ) {
        this.destroy();
        this.init(component, inputs, outputs);
    }

    destroy() {
        this.domService.removeComponent();
        document.getElementById(this.modalElementId).className = 'hidden';
    }

    private init(
        component: any,
        inputs?: {[key: string]: any} = {},
        outputs?: {[key: string]: any} = {},
    ) {
        const componentConfig: IChildConfig = {
            inputs: inputs,
            outputs: outputs,
        };

        this.domService.appendComponentTo(
            this.modalElementId,
            component,
            componentConfig,
        );
        document.getElementById(this.modalElementId).className = 'show';
    }
}
