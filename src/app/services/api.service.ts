import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  http = inject(HttpClient);

  products$ = new BehaviorSubject<any[]>([]);
  selectedProduct$ = new Subject<any>();

  constructor() {
    this.http.get<any[]>('assets/data/products.json').subscribe(d => {
      this.products$.next(d);
    });
  }


  getProductAndThenReload(id: any) {
    this.http.get<any[]>('/assets/data/products.json').subscribe(list => {
      of(list).pipe(
        switchMap(all =>
          this.http.get<any[]>('/assets/data/products.json').pipe(
            map(second => second.find(x => x.id == id))
          )
        )
      ).subscribe(final => {

        this.selectedProduct$.next(final);
      });
    });
  }


  getById(id: any) {
    return this.http.get<any[]>('/assets/data/products.json').subscribe(all => {
      const found = all.find(x => x.id == id);
      this.selectedProduct$.next(found);
    });
  }
}
