import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export const LanguageInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  const translate = inject(TranslateService);
  const lang = translate.currentLang ?? translate.getDefaultLang() ?? 'en';

  const cloned = req.clone({
    setHeaders: { 'Accept-Language': lang }
  });

  return next(cloned);
};
