import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@app/products-module/models/Product';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  #http = inject(HttpClient);
  #translate = inject(TranslateService);

  #productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.#productsSubject.asObservable();

  constructor() {
    const lang = this.#translate.currentLang! || this.#translate.getDefaultLang()!;
    this.loadProducts(lang);

    this.#translate.onLangChange.subscribe(event => {
      this.loadProducts(event.lang);
    });
  }

  private loadProducts(lang?: string): void {
    // ${environment.baseUrl}/${lang}.json
    this.#http
      .get<{ products: Product[] }>(`/assets/i18n/ka.json`)
      .pipe(map(res => res.products))
      .subscribe(products => this.#productsSubject.next(products));
  }

  getProducts(lang: string): Observable<Product[]> {
    return  this.#http.get<Product[]>(`${environment.baseUrl}/${lang}.json`);
  }
}
