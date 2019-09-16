import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Injectable,
    Injector,
} from '@angular/core';

export interface IChildConfig {
    inputs: {[key: string]: any};
    outputs: {[key: string]: any};
}
@Injectable({
    providedIn: 'root',
})
export class DomService {
    private childComponentRef: any;
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
    ) {}

    public appendComponentTo(parentId: string, child: any, childConfig?: IChildConfig) {
        // Create a component reference from the component
        const childComponentRef = this.componentFactoryResolver
            .resolveComponentFactory(child)
            .create(this.injector);

        // Attach the config to the child (inputs and outputs)
        this.attachConfig(childConfig, childComponentRef);

        this.childComponentRef = childComponentRef;
        // Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(childComponentRef.hostView);

        // Get DOM element from component
        const childDomElem = (childComponentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        // Append DOM element to the body
        document.getElementById(parentId).appendChild(childDomElem);
    }

    public removeComponent() {
        if (this.childComponentRef) {
            this.appRef.detachView(this.childComponentRef.hostView);
            this.childComponentRef.destroy();
        }
    }

    private attachConfig(config: IChildConfig, componentRef: ComponentRef<any>) {
        const inputs = config.inputs;
        const outputs = config.outputs;

        for (const key of Object.keys(inputs)) {
            componentRef.instance[key] = inputs[key];
        }

        for (const key of Object.keys(outputs)) {
            componentRef.instance[key] = outputs[key];
        }
    }
}
