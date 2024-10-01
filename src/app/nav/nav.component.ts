import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../service/product/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  filteredProductList: Product[] = [];
  searchQuery: string = '';

  constructor(private productService: ProductService) { }

  onSearch(): void {
    if (this.searchQuery.trim() != '') {
      this.productService.search(this.searchQuery).subscribe(
        (products) => {
          this.filteredProductList = products;
          console.log('Productos encontrados:', this.filteredProductList)
        },
        (error) => {
          console.error('Error al buscar productos:', error);
          this.filteredProductList = [];
        }
      )
    }
  }


}
