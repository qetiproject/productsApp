import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockDirective } from '../../../components/directives/stock.directive';
import { ProductDetails } from '../../models/Product';

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
  productDetails!: ProductDetails;

  ngOnInit(): void {
    this.productDetails = this.#route.snapshot.data['productDetails'];
  }

  discount(): void {
    if (this.productDetails) {
      this.productDetails = { ...this.productDetails, price: this.productDetails.price * 0.9 };
    }
  }

}
