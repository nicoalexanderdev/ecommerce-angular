import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../service/product/product.service';
import { Product } from '../models/product';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  filteredProductList: Product[] = [];
  query: string = '';
  usuario: string = '';
  router = inject(Router)

  constructor(private productService: ProductService, private authService: AuthService) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUsername();
  }

  onSearch(): void {
    if (this.query.trim() != '') {
      this.productService.search(this.query).subscribe(
        (products) => {
          this.filteredProductList = products;
          this.productService.actualizarProductos(this.filteredProductList)
          console.log('Productos encontrados:', this.filteredProductList)
          this.router.navigate(['tienda/search'], {
            queryParams: {
              query: this.query
            }
          })
        },
        (error) => {
          console.error('Error al buscar productos:', error);
          this.filteredProductList = [];
          this.productService.actualizarProductos([]);
        }
      )
    }
  }


}
