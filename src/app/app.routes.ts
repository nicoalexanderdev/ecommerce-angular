import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
    { path: '', redirectTo: '/tienda', pathMatch: 'full' },
    { path: 'tienda', component: ProductListComponent },
    { path: 'tienda/cart', component: CartComponent },
    { path: 'tienda/search', component: SearchComponent },
    { path: 'tienda/product/:id/:nombre', component: ProductComponent },
    { path: 'accounts/login', component: LoginComponent },
    { path: 'accounts/sign-up', component: SignUpComponent }
];
