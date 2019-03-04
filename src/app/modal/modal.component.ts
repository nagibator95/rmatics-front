import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';

import { DynamicHostDirective } from './dynamic-host.directive';
import { ModalData } from './modal-content';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  private _open = false;

  @ViewChild(DynamicHostDirective) innerContent!: DynamicHostDirective;
  @ViewChild('overlay') overlay!: ElementRef;

  constructor(
    private modalService: ModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnInit() {
    this.modalService.subscribe(value => {
      if (!value) {
        this.open = false;
        return;
      }
      const { component, data = {} } = value;

      this.open = true;

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const viewContainerRef = this.innerContent.viewContainerRef;
      const injector = Injector.create({
        providers: [{ provide: ModalData, useValue: data }],
      });

      viewContainerRef.clear();

      viewContainerRef.createComponent(componentFactory, undefined, injector);

      this.changeDetectorRef.detectChanges();
    });
  }

  set open(val: boolean) {
    this._open = val;
    this.changeDetectorRef.detectChanges();
  }

  get open() {
    return this._open;
  }

  handleClose = ($event?: Event) => {
    if (!$event || $event.target === this.overlay.nativeElement) {
      this.open = false;
    }
  }
}
