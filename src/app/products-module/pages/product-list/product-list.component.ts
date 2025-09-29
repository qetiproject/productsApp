import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    FormsModule,
    NgForOf
  ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductListComponent {
  api = inject(ApiService);
  el = inject(ElementRef);

  items: any[] = [];
  filterText = '';
  selected: any;

  constructor() {
    // memory leak: no unsubscribe
    this.api.products$.subscribe(p => {
      this.items = p;
      document.title = 'Count: ' + p.length; // direct DOM side effect
    });
  }

  reload() {
    // another bad nested subscribe
    this.api.getById(1); // returns Subscription, not Observable
  }

  pick(id: any) {
    this.api.getProductAndThenReload(id);
  }

  filtered() {
    return this.filterText
      ? this.items.filter(x =>
        (x.name + ' ' + x.category)
          .toLowerCase()
          .includes(this.filterText.toLowerCase())
      )
      : this.items;
  }
}
