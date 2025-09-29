import { createAction, props } from '@ngrx/store';
import { Product } from "../models/Product";

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);

export const deleteProduct = createAction('[Product] Delete Product', props<{id: number}>);
export const deleteProductSuccess  = createAction(
  '[Product] Delete Product Success',
  props<{ id: number }>()
);
export const deleteProductFailure = createAction(
  '[Product] Delete Product Failure',
  props<{ error: string }>()
);