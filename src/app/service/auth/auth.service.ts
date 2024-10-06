import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface login {
  access: string;
  refresh: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<login> {
    let data = {
      username: username,
      password: password
    }
    return this.http.post<login>(this.apiURL + 'accounts/login', { data });
  }
}
