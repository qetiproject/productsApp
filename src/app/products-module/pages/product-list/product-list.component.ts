import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { distinctUntilChanged, tap } from 'rxjs';
import { InputSearch } from "../../../components/input-search/input-search";
import { FilterPipe } from "../../../components/pipes/filter.pipe";
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';

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
  #productService = inject(ProductService);

  products$ = this.#productService.products$.pipe(
    distinctUntilChanged((a, b) => a.length === b.length),
    tap(p => document.title = 'Count: ' + p.length)
  )
  
  searchTerm: string = '';

  getProductKeys(product: Product): string[] {
    return [product.name.toLowerCase(), product.category.toLowerCase()]
  }
  
  ngOnInit(): void {
    this.#productService.getProducts();
  }

  onSearchEvent(value: string) {
    this.searchTerm = value;
  }
}
