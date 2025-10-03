import { inject, Injectable } from '@angular/core';
import { setLanguage } from '@app/core/store/language/language.actions';
import { selectCurrentLanguage } from '@app/core/store/language/language.selector';
import { CurrentLangEnum } from '@app/core/store/language/language.state';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Observable, tap } from 'rxjs';
import { deleteProduct, loadProducts } from '../store/product.action';
import { selectAllProducts, selectErrorProducts, selectLoadingProducts } from '../store/product.selector';

@Injectable({ providedIn: 'root' })
export class ProductFacade {
  #store = inject(Store);

  readonly products$ = this.#store.select(selectAllProducts).pipe(
    distinctUntilChanged((a, b) => a.length === b.length),
    tap(p => document.title = 'Count: ' + p.length)
  );

  readonly loading$: Observable<boolean> = this.#store.select(selectLoadingProducts);
  readonly error$: Observable<string | null> = this.#store.select(selectErrorProducts);
  readonly currentLang$: Observable<string> = this.#store.select(selectCurrentLanguage);

  constructor() {
    this.currentLang$.pipe(distinctUntilChanged()).subscribe(lang => {
      this.#store.dispatch(loadProducts({ lang }));
    });
  }

  setLanguage(lang: CurrentLangEnum) {
    this.#store.dispatch(setLanguage({ lang }));
  }

  deleteProduct(id: number): void {
    this.#store.dispatch(deleteProduct({ id }));
  }
}
