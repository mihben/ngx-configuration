import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ConfigurationLoaderService } from '../../../ngx-configuration/src/public-api';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { defaultConfiguration, provideConfiguration } from '../../../ngx-configuration/src/provideConfiguration';
import { BackendOptions } from './backend-options';
import { provideOptions } from '../../../ngx-configuration/src/provideOptions';

export function ConfigurationLoader(loader: ConfigurationLoaderService) {
    return () => loader.loadAsync();
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),

        // Registrating configuration sources based on environment
        provideConfiguration(builder => defaultConfiguration(builder, environment.environment)),
        // Registrating BackendOptions
        provideOptions(BackendOptions, builder => builder.bind('Backend').validateDecorators()),

        provideHttpClient(),
    ],
};
