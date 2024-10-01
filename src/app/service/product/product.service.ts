import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product';
import { environment } from '../../../environments/environment';
import { Marca } from '../../models/marca';
import { Categoria } from '../../models/categoria';
import { MakerResponse } from '../../models/interfaces/MakerResponse';
import { CategoryResponse } from '../../models/interfaces/CategoryResponse';


@Injectable({ providedIn: 'root' })
export class ProductService {

  private apiUrl = environment.apiUrl;

  headers = new HttpHeaders({
    'Authorization': 'Token 7688f81c094d735e469a4fc4cba97917bf07c89b',
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + "/products");
  }

  getMakers(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl + "/makers");
  }

  getCategories(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl + "/categories");
  }

  getProductsByMaker(marcaId: number): Observable<MakerResponse> {
    return this.http.get<MakerResponse>(this.apiUrl + "/products/maker/" + marcaId);
  }

  getProductsByCategory(categoriaId: number): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(this.apiUrl + "/products/category/" + categoriaId);
  }

  search(query: string): Observable<Product[]> {
    let params = new HttpParams().set('query', query);
    return this.http.get<Product[]>(this.apiUrl + "/search", { params });
  }


  // Behavior subject como intercomunidor de data entre componentes

  private productsSource = new BehaviorSubject<Product[]>([]);

  productos$ = this.productsSource.asObservable();

  actualizarProductos(productos: Product[]) {
    this.productsSource.next(productos);
  }
}
