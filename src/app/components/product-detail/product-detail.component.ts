import { Component, Input, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {CurrencyPipe, DatePipe, NgClass, NgIf} from '@angular/common';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  @Input() product: any;
  api = inject(ApiService);


  constructor() {

    this.api.selectedProduct$.subscribe(p => {
      this.product = p;
      if (this.product) (this.product as any).lastSeen = Date.now();
    });
  }


  discount10() {
    if (this.product) {
      this.product.price = this.product.price * 0.9;

      this.api.getProductAndThenReload(this.product.id);
    }
  }
  stockClass(s: any) { return s > 0 ? 'in' : 'out'; }
}
