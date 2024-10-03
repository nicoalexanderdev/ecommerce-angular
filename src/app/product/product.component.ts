import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  product: Product | undefined;
  spinner: boolean = true;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const productId = +params['id'];
        this.loadProduct(productId);
      }
    )
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.spinner = false;
        console.log(product);
        this.product = product;
      },
      error: (error) => {
        console.log("Error al obtener el producto", error);
      }
    })
  }


}
