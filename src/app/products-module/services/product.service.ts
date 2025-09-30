import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@app/products-module/models/Product';
import { map, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  #http = inject(HttpClient);

  #productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.#productsSubject.asObservable();

  loadProducts(lang: string): void {
    this.#http
      .get<{ [key: string]: Product[] }>(`${environment.baseUrl}`)
      .pipe(map(res => res[lang] ?? res['ka']))
      .subscribe(products => this.#productsSubject.next(products));
  }

  getProducts(lang?: string): Observable<Product[]> {
    if (lang) {
      this.loadProducts(lang);
    }
    return this.products$;
  }

}
