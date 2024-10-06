import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';

export interface loginInterface {
  username: string,
  password: string
}

interface loginResponse {
  user: User
  refresh: string;
  access: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiURL = environment.apiUrl;

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  login(datosLogin: loginInterface): Observable<loginResponse> {
    return this.http.post<loginResponse>(this.apiURL + '/accounts/login/', datosLogin);
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();
    return this.http.post<any>(this.apiURL + '/token/refresh/', refreshToken);
  }

  getAuthToken() {
    return localStorage.getItem('access') || '';
  }

  getRefreshToken() {
    return localStorage.getItem('refresh') || '';
  }

  getUsername() {
    return localStorage.getItem('username') || '';
  }
}
