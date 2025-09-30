export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategories;
}

export type ProductDetails = Product & {
  stock: number;
  rating: number;
  lastSeen: number;
}

export enum ProductCategories {
  Phones = 'Phones',
  Laptops = 'Laptops',
  Accessories = 'Accessories',
  Monitors = 'Monitors'
}

export interface ProductsByLang {
  [lang: string]: Product[];
}
