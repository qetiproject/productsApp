import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { Product } from '../models/Product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  http = inject(HttpClient);

  // products$ = new BehaviorSubject<any[]>([]);
  // selectedProduct$ = new Subject<any>();

  // constructor() {
  //   this.http.get<any[]>('assets/data/products.json').subscribe(d => {
  //     this.products$.next(d);
  //   });
  // }


  // getProductAndThenReload(id: any) {
  //   this.http.get<any[]>('/assets/data/products.json').subscribe(list => {
  //     of(list).pipe(
  //       switchMap(all =>
  //         this.http.get<any[]>('/assets/data/products.json').pipe(
  //           map(second => second.find(x => x.id == id))
  //         )
  //       )
  //     ).subscribe(final => {

  //       this.selectedProduct$.next(final);
  //     });
  //   });
  // }


  // getById(id: any) {
  //   return this.http.get<any[]>('/assets/data/products.json').subscribe(all => {
  //     const found = all.find(x => x.id == id);
  //     this.selectedProduct$.next(found);
  //   });
  // }

  #http = inject(HttpClient);
  #productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.#productsSubject.asObservable();

  getProducts(): void {
    if (!this.#productsSubject.value.length) {
      this.#http.get<Product[]>(environment.baseUrl).pipe(
        catchError(() => of([]))
      ).subscribe(result => this.#productsSubject.next(result));
    }
  }
}
