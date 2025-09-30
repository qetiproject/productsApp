import { Routes } from "@angular/router";
import { UserPermission } from "@app/core/guards/user-permission";
import { ProductDetailComponent, ProductDetailsResolver, ProductListComponent } from "@products-module-pages";

export const productRoutes: Routes = [
  {
    path: '',
    component:ProductListComponent,
  },
  { 
    path: ':id', 
    component: ProductDetailComponent, 
    resolve: { productDetails: ProductDetailsResolver },
    canActivate: [UserPermission],
  },
]