import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { environment } from '../../../environments/environment';
import { Marca } from '../../models/marca';
import { Categoria } from '../../models/categoria';

export interface ProductResponse {
  marca: string;
  productos: Product[];
}



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

  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl + "/get-marcas", { headers: this.headers });
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl + "/get-categorias", { headers: this.headers });
  }

  getProductsByMarca(marcaId: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.apiUrl + "/get-productos-marca/" + marcaId, { headers: this.headers });
  }
}
