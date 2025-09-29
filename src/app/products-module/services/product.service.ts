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

  #http = inject(HttpClient);
  #productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.#productsSubject.asObservable();

  // getProducts(): void {
  //   if (!this.#productsSubject.value.length) {
  //     this.#http.get<Product[]>(environment.baseUrl).pipe(
  //       catchError(() => of([]))
  //     ).subscribe(result => this.#productsSubject.next(result));
  //   }
  // }
  getProducts(): Observable<Product[]> {
    return  this.#http.get<Product[]>(environment.baseUrl);
  }
}
