import {
  forwardRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputType = 'password' | 'text' | 'number';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})

export class InputComponent implements ControlValueAccessor {
  @Input() autocomplete = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() value: string | number = '';
  @Input() hasError = false;
  @Output() valueChange = new EventEmitter<string | number>();
  @Output() enter = new EventEmitter();
  @ViewChild('input') elementRef?: ElementRef;

  isShowPassword = false;

  onChange = (_value: string | number) => {};
  onTouched = () => {};

  change(value: string | number) {
    this.onChange(value);
    this.valueChange.emit(value);
  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
    if (this.elementRef) {
      this.elementRef.nativeElement.setAttribute('type', this.isShowPassword ? 'text' : 'password');
    }
  }

  writeValue(value: string | number) {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
