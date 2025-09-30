import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { selectCurrentLanguage } from '@app/core/store/language/language.selector';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';

export const LanguageInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const store = inject(Store);

  return store.select(selectCurrentLanguage).pipe(
    take(1), 
    switchMap(lang => {
      const cloned = req.clone({
        setHeaders: { 'Accept-Language': lang || 'en' }
      });
      return next(cloned);
    })
  );
};
