import { Product } from "../models/Product";

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string;
}