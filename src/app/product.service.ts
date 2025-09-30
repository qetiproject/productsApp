import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from './products-module/models/Product';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  #http = inject(HttpClient);

  getProducts(lang: string | null): Observable<Product[]> {
    return this.#http
      .get<{ products: Product[] }>(`/assets/i18n/${lang}.json`)
      .pipe(map(res => res.products));
  }
}
