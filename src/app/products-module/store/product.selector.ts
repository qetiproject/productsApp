import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.store';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectLoadingProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

export const selectErrorProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.error
)