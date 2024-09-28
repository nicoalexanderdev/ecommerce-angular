import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../service/product/product.service';
import { CommonModule } from '@angular/common';
import { HeroComponent } from "../hero/hero.component";


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HeroComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  productList: Product[] = [];
  showSpinner: boolean = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.findAll().subscribe({
      next: (data) => {
        this.productList = data;
        this.showSpinner = false;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
        this.showSpinner = false;
      }
    });
  }

}
