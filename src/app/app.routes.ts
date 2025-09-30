import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () =>
      import('@app/products-module/pages/index').then(m => m.productRoutes),
  },
  { path: '**', redirectTo: 'products' }
];

