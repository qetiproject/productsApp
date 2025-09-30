import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, first, Observable, tap } from "rxjs";
import { deleteProduct, loadProducts } from "../store/product.action";
import { selectAllProducts, selectErrorProducts, selectLoadingProducts } from "../store/product.selector";

@Injectable({
    providedIn: 'root'
})
export class ProductFacade {
    #store = inject(Store);

    readonly  products$ = this.#store.select(selectAllProducts).pipe(
        distinctUntilChanged((a, b) => a.length === b.length),
        tap(p => document.title = 'Count: ' + p.length)
    )
    readonly loading$: Observable<boolean> = this.#store.select(selectLoadingProducts);
    readonly error$: Observable<string | null> = this.#store.select(selectErrorProducts);

    loadProducts() {
        this.#store.select(selectAllProducts).pipe(first()).subscribe(products => {
            if (!products.length) {
                this.#store.dispatch(loadProducts());
            }
        });

    }

    deleteProduct(id: number): void {
        this.#store.dispatch(deleteProduct({ id }));
    }
}