import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { ProductService } from "../services/product.service";
import { loadProducts, loadProductsFailure, loadProductsSuccess } from "./product.action";

@Injectable()
export class ProductEffect {
  actions$ = inject(Actions);
  productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map((products) => loadProductsSuccess({ products })), 
          catchError((error) => of(loadProductsFailure({ error })))
        )
      )
    )
  );
}
