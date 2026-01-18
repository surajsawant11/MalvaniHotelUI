import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { GlobalErrorHandler } from './core/error/global-error.handler.service';
import { errorInterceptor } from './core/interceptors/error.interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideHttpClient(),
    // { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideHttpClient(withInterceptors([errorInterceptor]))
    // provideSweetpops()
  ]
};


