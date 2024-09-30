import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { MarcasComponent } from './marcas/marcas.component';

export const routes: Routes = [
    { path: '', redirectTo: '/tienda', pathMatch: 'full' },
    { path: 'tienda', component: ProductListComponent },
    { path: 'tienda/cart', component: CartComponent },
    { path: 'tienda/categorias', component: CategoriasComponent },
    { path: 'tienda/marcas', component: MarcasComponent }
];
