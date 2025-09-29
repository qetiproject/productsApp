import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { productReducer } from '@products-module/store/product.reducer';
import { routes } from './app.routes';
import { ProductEffect } from './products-module/store/product.effect';

export const appConfig: ApplicationConfig = {
   providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(
      withFetch(),
    ),
    provideStore({
      products: productReducer,
    }),
    provideEffects([ProductEffect]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    }),
  ]
};
