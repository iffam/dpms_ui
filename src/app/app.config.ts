import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlidePanel, MatSlidePanelModule } from 'ngx-mat-slide-panel';

import { routes } from './app.routes';
import { provideAuth } from './auth/auth.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    MatSlidePanel,
    MatSlidePanelModule,
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAuth(),
  ],
};
