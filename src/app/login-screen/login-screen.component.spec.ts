import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginScreenComponent } from './login-screen.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { config } from 'src/config';

describe('LoginScreenComponent', () => {
  let component: LoginScreenComponent;
  let fixture: ComponentFixture<LoginScreenComponent>;
  let authService: AuthService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        LoginScreenComponent,
      ],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(LoginScreenComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    controller = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login button should be disable if no user not pass are provided', () => {
    component.loginForm.get('email')?.setValue('');
    component.loginForm.get('password')?.setValue('');
    fixture.detectChanges();
    const loginButton = fixture.debugElement.query(By.css('button'));
    expect(component.loginForm.invalid).toBeTruthy();
    expect(loginButton.nativeElement.disabled).toBeTruthy();
  });

  it('login button should be enabled if form is valid', () => {
    component.loginForm.get('email')?.setValue('pozasuarez@gmail.com');
    component.loginForm.get('password')?.setValue('1234');
    fixture.detectChanges();
    const loginButton = fixture.debugElement.query(By.css('button'));
    expect(component.loginForm.valid).toBeTruthy();
    expect(loginButton.nativeElement.disabled).toBeFalse();
  });

  it('login button should be disabled if email is not valid', () => {
    component.loginForm.get('email')?.setValue('pozasuarez.com');
    component.loginForm.get('password')?.setValue('1234');
    fixture.detectChanges();
    const loginButton = fixture.debugElement.query(By.css('button'));
    expect(component.loginForm.valid).toBeFalse();
    expect(loginButton.nativeElement.disabled).toBeTrue();
  });

  it('if login fails because of invalid credentiales, snackBar show us the error', () => {
    const expectedUrl = config.baseApiUrl + '/auth/login';
    let errorMsg: string = '';

    const status = 401;
    const statusText = 'Unauthorized';
    const errorEvent = new ProgressEvent('API error');

    authService.login('pozasuarez@gmail.com', '1234')
      .subscribe({
        error: (error) => {
          errorMsg = error;
        },
      });


    const request = controller.expectOne(expectedUrl);

    request.flush('', { status, statusText })


    expect(errorMsg).toEqual('Credenciales incorrectas');
  });

});
