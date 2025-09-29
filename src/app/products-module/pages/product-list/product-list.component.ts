import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSearch } from '@app/components/input-search/input-search';
import { FilterPipe } from '@app/features/pipes/filter.pipe';
import { ProductItemComponent } from '@app/products-module/components/product-item/product-item.component';
import { Product } from '@app/products-module/models/Product';
import { deleteProduct, loadProducts } from '@app/products-module/store/product.action';
import { selectAllProducts, selectLoading } from '@app/products-module/store/product.selector';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    FormsModule,
    AsyncPipe,
    ProductItemComponent,
    InputSearch,
    FilterPipe
  ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductListComponent implements OnInit{
  store = inject(Store);
  products$ = this.store.select(selectAllProducts).pipe(
    distinctUntilChanged((a, b) => a.length === b.length),
    tap(p => document.title = 'Count: ' + p.length)
  )
  loading$ = this.store.select(selectLoading);
  
  searchTerm: string = '';

  getProductKeys(product: Product): string[] {
    return [product.name.toLowerCase(), product.category.toLowerCase()]
  }
  
  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  onSearchEvent(value: string) {
    this.searchTerm = value;
  }

  onDeleteProductEvent(product: Product) {
     this.store.dispatch(deleteProduct({ id: product.id}));
  }
}
