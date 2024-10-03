import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { ProductComponent } from './product/product.component';

export const routes: Routes = [
    { path: '', redirectTo: '/tienda', pathMatch: 'full' },
    { path: 'tienda', component: ProductListComponent },
    { path: 'tienda/cart', component: CartComponent },
    { path: 'tienda/search', component: SearchComponent },
    { path: 'tienda/product/:id/:nombre', component: ProductComponent }
];
