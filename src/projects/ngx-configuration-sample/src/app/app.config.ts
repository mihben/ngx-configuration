import { APP_INITIALIZER, ApplicationConfig, inject, Injector, provideZoneChangeDetection, runInInjectionContext } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { Configuration, ConfigurationLoaderService, ConfigurationSourceStoreService, ConfigurationStore, JsonConfigurationSourceOptions, JsonConfigurationSourceService } from '../../../ngx-configuration-core/src/public-api';
import { HttpClient, provideHttpClient } from '@angular/common/http';

export function ConfigurationLoader(loader: ConfigurationLoaderService) {
  return () => loader.loadAsync();
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), { provide: Configuration, useClass: Configuration, deps: [ConfigurationStore] }, ConfigurationStore,
  {
    provide: APP_INITIALIZER,
    useFactory: ConfigurationLoader,
    deps: [ConfigurationLoaderService, Injector],
    multi: true
  },
  {
    provide: ConfigurationLoaderService,
    useClass: ConfigurationLoaderService,
    deps: [ConfigurationSourceStoreService, Configuration]
  },
  {
    provide: ConfigurationSourceStoreService,
    useFactory: () => {
      const result = new ConfigurationSourceStoreService();
      const options = new JsonConfigurationSourceOptions();
      options.path = "appsettings.json";
      result.register(new JsonConfigurationSourceService(inject(HttpClient), options));

      const optionsDev = new JsonConfigurationSourceOptions();
      optionsDev.path = "appsettings.development.json";
      optionsDev.optional = true;
      result.register(new JsonConfigurationSourceService(inject(HttpClient), optionsDev));

      return result;
    },
    deps: [HttpClient]
  },
  provideHttpClient()
  ]
};
