import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ConfigurationLoaderService } from '../../../ngx-configuration-core/src/public-api';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { defaultConfiguration, provideConfiguration } from '../../../ngx-configuration-core/src/provideConfiguration';

export function ConfigurationLoader(loader: ConfigurationLoaderService) {
    return () => loader.loadAsync();
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideConfiguration(builder => defaultConfiguration(builder, environment.environment)),
        provideHttpClient(),
    ],
};
