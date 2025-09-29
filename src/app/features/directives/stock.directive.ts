import { Directive, HostBinding, Input } from "@angular/core";

@Directive({
  selector: '[appStockClass]',
  standalone: true
})
export class StockDirective {
  @Input('appStockClass') stock: number | null = null;

  @HostBinding('class.in') get isIn() { return !!this.stock && this.stock > 0; }
  @HostBinding('class.out') get isOut() { return this.stock !== null && this.stock <= 0; }
}
