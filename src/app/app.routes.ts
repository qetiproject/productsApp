import { Routes } from '@angular/router';
import { UserPermission } from './core/guards/user-permission';
import { ProductDetailComponent } from './products-module/pages/product-detail/product-detail.component';
import { ProductDetailsResolver } from './products-module/pages/product-detail/product-details.resolver';
import { ProductListComponent } from './products-module/pages/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    children: [
      { path: '', component: ProductListComponent },
      { 
        path: ':id', 
        component: ProductDetailComponent, 
        resolve: { productDetails: ProductDetailsResolver},
        canActivate: [UserPermission],
      },
    ],
  },
  {
    path: '**', redirectTo: 'products'
  }
];
