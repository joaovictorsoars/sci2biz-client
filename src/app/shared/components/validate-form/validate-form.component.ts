import { Component, computed, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

type ValidationErrorType = 'required' | 'email';

@Component({
  selector: 'app-validate-form',
  standalone: true,
  templateUrl: './validate-form.component.html',
})
export class ValidateFormComponent {
  validationErrors = input<ValidationErrors | null>(null);

  showErrors = computed(() => this.validationErrors !== null);

  errors = computed(() => {
    if (this.validationErrors() === null) return [];

    const currentError = Object.keys(
      this.validationErrors()!,
    )[0] as ValidationErrorType;

    return [this.getErrorMessage(currentError)];
  });

  private getErrorMessage(value: ValidationErrorType) {
    switch (value) {
      case 'required':
        return 'Campo obrigatorio';
      case 'email':
        return 'Email invalido';
    }
  }
}
