import { createAction, props } from '@ngrx/store';
import { Product } from "../models/Product";

export const loadProducts = createAction(
  '[Product] Load Products', 
  props<{ lang: string }>()
);
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ id: number }>()
);