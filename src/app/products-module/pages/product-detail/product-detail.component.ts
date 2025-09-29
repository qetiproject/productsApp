import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockDirective } from '../../../components/directives/stock.directive';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe,
    CommonModule,
    StockDirective
],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
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
