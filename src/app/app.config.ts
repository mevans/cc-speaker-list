import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { BaseApiUrl } from './core/tokens/base-api-url.token';
import { environment } from '../environment/environment';
import { ApiSeed } from './core/tokens/api-seed.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: BaseApiUrl,
      useValue: environment.baseApiUrl,
    },
    {
      provide: ApiSeed,
      useValue: environment.apiSeed,
    }
  ],
};
