import { CommonModule } from '@angular/common';
import { Component, WritableSignal, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUserLogin } from '../../data/authentication-datasource/models/user-login.model';
import { IUser } from '../../data/authentication-datasource/models/user.model';
import { FormInitializerService } from '../../shared/services/forms-Initializer.service';
import { StorageService } from '../../core/services/storage.service';
import { AuthenticationService } from '../../data/authentication-datasource/service/authentication.service';
import { IJwtToken } from '../../data/authentication-datasource/models/jwt-token.model';
import { Router } from '@angular/router';
import { PrimeNGModule } from '../../shared/modules/primeng.module';
import { FormsMessageErrorsService } from '../../shared/services/forms-message-errors.service';
import { SweetalertService } from '../../core/services/sweetalert.service';

@Component({
  selector: 'feature-authentication',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNGModule
  ],
  providers: [
    SweetalertService
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
  public registerMode: WritableSignal<boolean> = signal<boolean>(false);
  public formLogin: FormGroup = this.formInitializerService.initLoginForm();
  public formRegister: FormGroup = this.formInitializerService.initUserForm();

  constructor(
    private authenticationService: AuthenticationService,
    private formInitializerService: FormInitializerService,
    private storageService: StorageService,
    private sweetAlertService: SweetalertService,
    private router: Router,
    public formMessageError: FormsMessageErrorsService
  ) { }

  changeAuthenticationMode() {
    this.registerMode.set(!this.registerMode());
    this.formLogin = this.formInitializerService.initLoginForm();
    this.formRegister = this.formInitializerService.initUserForm();
  }

  toDoAction() {
    if (this.registerMode()) {
      this.signUp();
    } else {
      this.logIn();
    }
  }

  signUp() {
    this.authenticationService.register(this.formRegister.value as IUser).subscribe({
      next: (data: IUser) => {
        this.formLogin.setValue({
          email: this.formRegister.value.email,
          password: this.formRegister.value.password
        });
        this.logIn();
      }, error: (err: any) => {
        if (err.status === 400) {
          this.sweetAlertService.toastAlert('The email entered is already registered, instead please log in', 'error', "bottom");
        } else {
          this.sweetAlertService.toastAlert(err.message, 'error', "bottom");
        }
      }
    });
  }

  logIn() {
    this.authenticationService.login(this.formLogin.value as IUserLogin).subscribe({
      next: (data: IJwtToken) => {
        this.sweetAlertService.toastAlert('Welcome', 'success', "bottom");
        this.storageService.setSessionItem('jwt', data);
        this.router.navigate(['/']);
      }, error: (err: any) => {
        if (err.status === 400) {
          this.sweetAlertService.toastAlert('Incorrect email and/or password, try again', 'error', "bottom");
        } else {
          this.sweetAlertService.toastAlert(err.message, 'error', "bottom");
        }
      }
    });
  }
}