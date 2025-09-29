import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Product } from '@app/products-module/models/Product';
import { selectAllProducts } from '@app/products-module/store/product.selector';
import { Store } from '@ngrx/store';
import { filter, firstValueFrom, map } from 'rxjs';

export const ProductDetailsResolver: ResolveFn<Product | undefined> = async (
  route: ActivatedRouteSnapshot
) => {
  const store = inject(Store);
  const id = Number(route.paramMap.get('id'));

  const products = await firstValueFrom(
    store.select(selectAllProducts).pipe(
      filter(p => p.length > 0),
      map(arr => arr.map(p => ({ ...p, lastSeen: Date.now() })))
    )
  );

  const product = products.find(p => p.id === id);
  return product;
};
