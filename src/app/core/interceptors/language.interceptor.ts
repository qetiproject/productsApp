// import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';

// @Injectable()
// export class LanguageInterceptor implements HttpInterceptor {
//   constructor(private translate: TranslateService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const lang = this.translate.currentLang || this.translate.getDefaultLang();
//     const cloned = req.clone({
//       setHeaders: { 'Accept-Language': lang }
//     });
//     return next.handle(cloned);
//   }
// }
