import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@app/products-module/models/Product';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product!: Product;
}
