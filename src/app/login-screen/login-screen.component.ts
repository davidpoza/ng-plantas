import { Component } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { config } from 'src/config';
@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent {
  loginForm! : FormGroup;
  appTitle: string = config.appTitle;

  constructor (private readonly fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.initForm();
  }

  initForm() : FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
  }

  getEmailErrorMessage() : string {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'Debes introducir un email';
    }

    return this.loginForm.get('email')?.hasError('email') ? 'El email no es válido' : '';
  }

  getPasswordErrorMessage() : string {
    if (this.loginForm.get('password')?.hasError('required')) {
      return 'Debes introducir una contraseña';
    }
    return '';
  }
}
