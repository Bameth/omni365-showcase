import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideLottieOptions({
      player: () => player,
    }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' }))
  ]
};
