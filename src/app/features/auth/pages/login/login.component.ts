import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TextInputComponent } from '@shared/components/text-input/text-input.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';

@Component({
  selector: 'app-login-page',
  imports: [
    MatIcon,
    RouterLink,
    ButtonComponent,
    TextInputComponent,
    TextInputComponent,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private router: Router,
    private service: AuthenticationService,
  ) {}

  protected getValidationErrors(formName: string) {
    const control = this.form.get(formName)!;
    return control.touched ? control.errors : null;
  }

  protected onSubmit() {
    const { email, password } = this.form.getRawValue();
    this.service.login(email!, password!).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
