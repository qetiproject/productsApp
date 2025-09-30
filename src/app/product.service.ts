import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  rating: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(lang: string | null): Observable<Product[]> {
    return this.http
      .get<{ products: Product[] }>(`/assets/i18n/${lang}.json`)
      .pipe(map(res => res.products));
  }
}
