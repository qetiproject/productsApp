import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Product, ProductsService } from './product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CodeR';

  constructor(private translate: TranslateService, private productsService: ProductsService,
) {
    this.translate.addLangs(['en', 'ka']);
    const defaultLang = 'en';
    this.translate.use(defaultLang);
    this.translate.use('en');
  }

  products: Product[] = [];


  ngOnInit(): void {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    this.productsService.getProducts(lang).subscribe(res => {
      this.products = res;
    });

    // თუ ენა შეიცვლება runtime-ში
    this.translate.onLangChange.subscribe(event => {
      this.productsService.getProducts(event.lang).subscribe(res => {
        this.products = res;
      });
    });
  }
}
