import { createReducer, on } from '@ngrx/store';
import { deleteProduct, loadProducts, loadProductsFailure, loadProductsSuccess } from './product.action';
import { ProductState } from './product.store';

export const initialState: ProductState = {
  products: [],
  loading: false,
  error: ''
};

export const productReducer = createReducer(
  initialState,
  on(loadProducts, state => ({ ...state, loading: true })),
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(deleteProduct, (state, { id }) => ({
    ...state,
    products: state.products ? state.products.filter(p => p.id !== id) : []
  }))
);
