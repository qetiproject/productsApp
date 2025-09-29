import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { filter, firstValueFrom, map } from 'rxjs';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';

export const ProductDetailsResolver: ResolveFn<Product | undefined> = async (
  route: ActivatedRouteSnapshot
) => {
  const productService = inject(ProductService);
  const id = Number(route.paramMap.get('id'));

  productService.getProducts();

  const products = await firstValueFrom(
    productService.products$.pipe(
      filter(p => p.length > 0),
      map(arr => arr.map(p => ({ ...p, lastSeen: Date.now()})))
    )
  );
  const product = products.find(p => p.id === id);
  return product;
};
