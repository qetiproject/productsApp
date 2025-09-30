import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(): Observable<any> {
    return this.http.get(`${environment.baseUrl}`);
  }
}

export function customLoaderFactory(http: HttpClient) {
  return new CustomTranslateLoader(http);
}
