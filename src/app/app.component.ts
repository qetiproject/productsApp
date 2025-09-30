import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CodeR';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'ka']);
    const defaultLang = 'en';
    this.translate.use(defaultLang);
    this.translate.use('ka');
  }
}
