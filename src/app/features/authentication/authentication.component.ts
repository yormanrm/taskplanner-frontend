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

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
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
    private router: Router
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
        console.log("Error", err);
      }
    });
  }

  logIn() {
    this.authenticationService.login(this.formLogin.value as IUserLogin).subscribe({
      next: (data: IJwtToken) => {
        alert("Welcome");
        this.storageService.setSessionItem('jwt', data);
        this.router.navigate(['/']);
      }, error: (err: any) => {
        console.log("Error", err);
      }
    });
  }
}