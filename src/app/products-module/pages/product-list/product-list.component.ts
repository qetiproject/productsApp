import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    FormsModule,
    AsyncPipe,
    ProductItemComponent
  ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductListComponent implements OnInit{
  // api = inject(ApiService);
  // el = inject(ElementRef);

  // items: any[] = [];
  // filterText = '';
  // selected: any;

  // constructor() {
  //   // memory leak: no unsubscribe
  //   this.api.products$.subscribe(p => {
  //     this.items = p;
  //     document.title = 'Count: ' + p.length; // direct DOM side effect
  //   });
  // }

  // reload() {
  //   // another bad nested subscribe
  //   this.api.getById(1); // returns Subscription, not Observable
  // }

  // pick(id: any) {
  //   this.api.getProductAndThenReload(id);
  // }

  // filtered() {
  //   return this.filterText
  //     ? this.items.filter(x =>
  //       (x.name + ' ' + x.category)
  //         .toLowerCase()
  //         .includes(this.filterText.toLowerCase())
  //     )
  //     : this.items;
  // }

  #productService = inject(ProductService);

  products$ = this.#productService.products$;
  searchTerm: string = '';

  ngOnInit(): void {
    this.#productService.getProducts();
  }
}
