import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSearch } from '@app/components/input-search/input-search';
import { FilterPipe } from '@app/features/pipes/filter.pipe';
import { ProductItemComponent } from '@app/products-module/components/product-item/product-item.component';
import { Product } from '@app/products-module/models/Product';
import { ProductFacade } from '@app/products-module/services/product.facade';
import { TranslateService } from '@ngx-translate/core';

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
  productsFacade = inject(ProductFacade);
  translate = inject(TranslateService);
  
  searchTerm: string = '';

  getProductKeys(product: Product): string[] {
    return [product.name.toLowerCase(), product.category.toLowerCase()]
  }
  
  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    const lang = this.translate.currentLang ?? this.translate.getDefaultLang() ?? 'en'
    this.productsFacade.loadProducts(lang)
  }

  onSearchEvent(value: string) {
    this.searchTerm = value;
  }

  onDeleteProductEvent(product: Product) {
    this.productsFacade.deleteProduct(product.id);
  }
}
