import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../service/product/product.service';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  route = inject(ActivatedRoute)

  filteredProductList: Product[] = [];
  message: string = '';
  searchFor: string = '';


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const newSearchFor = params['query'];

      const savedSearchFor = sessionStorage.getItem('searchFor');
      if (savedSearchFor !== newSearchFor) {
        sessionStorage.removeItem('filteredProductList');
        sessionStorage.setItem('searchFor', newSearchFor);
        this.searchFor = newSearchFor;
        this.onSearch();
      } else {
        this.searchFor = newSearchFor;
        this.onSearch();
      }
    })

  }

  onSearch() {
    const savedProducts = sessionStorage.getItem('filteredProductList');
    if (savedProducts) {
      this.filteredProductList = JSON.parse(savedProducts);
    } else {
      this.productService.productos$.subscribe(
        (products) => {
          if (products && products.length > 0) {
            console.log("productos recibidos", products);
            this.filteredProductList = products;
            this.message = '';

            // Guarda los productos en sessionStorage
            sessionStorage.setItem('filteredProductList', JSON.stringify(this.filteredProductList));
          } else {
            this.filteredProductList = [];
            this.message = "No se encontraron productos para la búsqueda";

            // Limpia el sessionStorage si no hay productos
            sessionStorage.removeItem('filteredProductList');
          }
        },
        (error) => {
          console.error("Error en la búsqueda:", error);
          this.message = "Ocurrió un error al buscar los productos.";
        }
      )
    }
  }


}
