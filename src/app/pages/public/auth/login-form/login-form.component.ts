import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '../../../../../environments/environment.development';
import { Login } from '../../../../shared/models/login.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { AlertsService } from '../../../../shared/services/helpers/alerts.service';
import { UserStorageService } from '../../../../shared/services/user-storage.service';

@Component({
  selector: 'app-login-form',
  standalone: false,

  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  loginForm: FormGroup;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private userStorageService: UserStorageService,
    private router: Router,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.createLoginFormGroup();
  }

  //#region form
  createLoginFormGroup(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  getControl(control: string): FormControl {
    return this.loginForm.get(control) as FormControl;
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      const login: Login = this.mapLoginFromForm();
      this.onLogin(login);
    } else this.onInvalidForm();
  }
  //#endregion form

  onLogin(login: Login): void {
    this.onShowLoading();
    this.authService.login(login).subscribe({
      next: (res) => this.onLoginSuccess(res),
      error: (e) => this.onLoginError(e),
    });
  }

  private onLoginSuccess(accessToken: string): void {
    if (accessToken) {
      this.saveAccessTokenInStorage(accessToken);
      this.navigateToHome();
      this.onDismissLoading();
    } else this.onLoginError();
  }

  private onLoginError(errorMsg?: string): void {
    this.onDismissLoading();
    this.onShowErrorAlert(errorMsg);
  }

  private mapLoginFromForm(): Login {
    const { email, password } = this.loginForm.value;
    const login: Login = { email, password };
    return login;
  }

  private saveAccessTokenInStorage(accessToken: string): void {
    this.userStorageService.setAccessTokenInAccessToken(accessToken);
  }

  private navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  private onShowErrorAlert(errorMsg?: string): void {
    this.alertsService.showErrorAlert(errorMsg);
  }

  private isFormValid(): boolean {
    return this.loginForm.valid;
  }

  private onInvalidForm(): void {
    this.alertsService.showErrorAlert(environment.errors.messages.invalidForm);
  }

  private onShowLoading(): void {
    this.isLoading = true;
  }

  private onDismissLoading(): void {
    this.isLoading = false;
  }
}
