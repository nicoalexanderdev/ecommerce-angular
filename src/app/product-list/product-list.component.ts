import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService, ProductResponse } from '../service/product/product.service';
import { CommonModule } from '@angular/common';
import { HeroComponent } from "../hero/hero.component";
import { Marca } from '../models/marca';
import { Categoria } from '../models/categoria';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HeroComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  productList: Product[] = [];
  marcasList: Marca[] = [];
  categoriasList: Categoria[] = [];
  filteredProductList: Product[] = [];
  selectedMarca: string = "";
  message: string = "";

  showSpinner: boolean = true;
  spinnerMarca: boolean = true;
  spinnerCategoria: boolean = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Obtener productos
    this.loadProducts();
    // Obtener marcas
    this.loadMarcas();
    //obtener categorias
    this.loadCategorias();
  }


  loadProducts(): void {
    this.productService.findAll().subscribe(
      (products) => {
        this.productList = products || [];
        this.filteredProductList = this.productList;
        this.showSpinner = false;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
        this.showSpinner = false;
        this.productList = [];
        this.filteredProductList = [];
      }
    );
  }

  loadMarcas(): void {
    this.productService.getMarcas().subscribe(
      (marcas) => {
        this.marcasList = marcas || [];
        this.spinnerMarca = false;
      },
      (error) => {
        console.error('Error al cargar marcas:', error);
        this.marcasList = [];
        this.spinnerMarca = false;
      }
    );
  }

  loadCategorias(): void {
    this.productService.getCategorias().subscribe({
      next: (data) => {
        this.categoriasList = data || [];
        this.spinnerCategoria = false;
      },
      error: (err) => {
        console.log("error al obtener categorias", err);
        this.spinnerCategoria = false;
        this.filteredProductList = []
      }
    })
  }


  // resetear filtro
  resetFilter(): void {
    this.filteredProductList = this.productList;
    this.selectedMarca = '';
    console.log('Filtro reseteado:', this.filteredProductList);
  }


  // filtrar productos por marca
  onMarcaChange(marcaId: number): void {
    this.showSpinner = true;
    this.filteredProductList = [];
    this.selectedMarca = "";
    this.message = "Cargando Productos...";
    this.productService.getProductsByMarca(marcaId).subscribe(
      (response: ProductResponse): void => {
        this.filteredProductList = response.productos;
        this.selectedMarca = response.marca;
        this.showSpinner = false;
        console.log('Productos filtrados:', this.filteredProductList);
      },
      (error) => {
        console.error('Error al filtrar productos por marca:', error);
        this.showSpinner = false;
        this.filteredProductList = [];
        this.selectedMarca = '';
        this.message = "No se encontraron productos"
      }
    );
  }

}
