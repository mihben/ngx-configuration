import { APP_INITIALIZER, ApplicationConfig, inject, Injector, provideZoneChangeDetection, runInInjectionContext } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { Configuration, ConfigurationLoaderService, ConfigurationSourceStoreService, ConfigurationStore, JsonConfigurationSourceOptions, JsonConfigurationSourceService } from '../../../ngx-configuration-core/src/public-api';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { defaultConfiguration, provideConfiguration } from '../../../ngx-configuration-core/src/provideConfiguration';

export function ConfigurationLoader(loader: ConfigurationLoaderService) {
  return () => loader.loadAsync();
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideConfiguration(defaultConfiguration),
  provideHttpClient()
  ]
};
