import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    NgClass,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  stockClass(s: any) { return s > 0 ? 'in' : 'out'; }

  #route = inject(ActivatedRoute);
  product?: Product;

  ngOnInit(): void {
    this.product = this.#route.snapshot.data['product'];
  }

  discount() {
    if (this.product) {
      this.product = { ...this.product, price: this.product.price * 0.9 };
    }
  }

}
