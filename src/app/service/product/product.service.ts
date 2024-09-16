import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private apiUrl = environment.apiUrl + "/productos";

  headers = new HttpHeaders({
    'Authorization': 'Token 7688f81c094d735e469a4fc4cba97917bf07c89b',
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { headers: this.headers });
  }
}
