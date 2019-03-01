import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { DynamicHostDirective } from './dynamic-host.directive';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  @Input() open = false;

  @ViewChild(DynamicHostDirective) innerContent!: DynamicHostDirective;
  @ViewChild('overlay') overlay!: ElementRef;

  constructor(
    private modalService: ModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnInit() {
    this.modalService.subscribe(component => {
      this.open = true;
      this.changeDetectorRef.detectChanges();

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

      const viewContainerRef = this.innerContent.viewContainerRef;
      viewContainerRef.clear();

      viewContainerRef.createComponent(componentFactory);
      this.changeDetectorRef.detectChanges();
    });
  }

  handleClose = ($event?: Event) => {
    if (!$event || $event.target === this.overlay.nativeElement) {
      this.open = false;
    }
  }
}
