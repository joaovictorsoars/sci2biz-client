import { Component, forwardRef, input, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { ValidateFormComponent } from '@shared/components/validate-form/validate-form.component';

@Component({
  selector: 'app-text-input',
  imports: [FormsModule, ValidateFormComponent, ValidateFormComponent],
  standalone: true,
  templateUrl: './text-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  protected value = signal<string | null>(null);

  placeholder = input<string>();
  type = input('text');
  validationErrors = input<ValidationErrors | null>(null);

  onChange!: (value: string | null) => void;
  onTouched!: () => void;

  writeValue(value: string | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  handleValueChange(value: string) {
    this.writeValue(value);
    this.onChange(value);
  }

  handleBlur() {
    this.onTouched();
  }
}
