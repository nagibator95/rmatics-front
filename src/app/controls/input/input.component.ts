import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

export type InputType = 'password' | 'text' | 'number';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InputComponent {
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() value: string | number = '';
  @Input() hasError = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() enter = new EventEmitter();
  @ViewChild('input') elementRef?: ElementRef;

  isShowPassword = false;

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
    if (this.elementRef) {
      this.elementRef.nativeElement.setAttribute('type', this.isShowPassword ? 'text' : 'password');
    }
  }
}
