import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/response/user.model';
import { INewUser } from '../models/body/new-user.model';
import { IJwtToken } from '../models/response/jwt-token.model';
import { ILoginInfo } from '../models/body/login-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = environment.apiUrl + "users";
  private http = inject(HttpClient);

  register(body: INewUser): Observable<IUser> {
    return this.http.post<IUser>(this.url + "/register", body)
  }

  login(body: ILoginInfo): Observable<IJwtToken> {
    return this.http.post<IJwtToken>(this.url + "/login", body);
  }
}
