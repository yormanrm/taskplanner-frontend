import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IJwtToken } from '../models/jwt-token.model';
import { IUser } from '../models/user.model';
import { IUserLogin } from '../models/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url: string = environment.apiUrl + "users";
  private http = inject(HttpClient);

  register(body: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.url + "/register", body)
  }

  login(body: IUserLogin): Observable<IJwtToken> {
    return this.http.post<IJwtToken>(this.url + "/login", body);
  }
}
