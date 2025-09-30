import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@app/environments/environment.development';
import { Product } from '@app/products-module/models/Product';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  #http = inject(HttpClient);
  #productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.#productsSubject.asObservable();

  getProducts(): Observable<Product[]> {
    return  this.#http.get<Product[]>(environment.baseUrl);
  }
}
