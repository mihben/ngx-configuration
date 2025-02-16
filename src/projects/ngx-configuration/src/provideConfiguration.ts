import { APP_INITIALIZER, Provider } from '@angular/core';
import { Configuration, ConfigurationLoaderService, ConfigurationSourceStoreService, ConfigurationStore } from './public-api';
import { HttpClient } from '@angular/common/http';

export const defaultConfiguration = (builder: ConfigurationSourceStoreService, environment: string): ConfigurationSourceStoreService => {
    builder.registerJson('appsettings.json').registerJson(`appsettings.${environment}.json`);

    return builder;
};

function initializer(loader: ConfigurationLoaderService): () => Promise<void> {
    return async () => {
        await loader.loadAsync();
    };
}

export function provideConfiguration(build: (store: ConfigurationSourceStoreService) => void): Provider[] {
    return [
        {
            provide: ConfigurationStore,
            useClass: ConfigurationStore,
        },
        {
            provide: Configuration,
            useClass: Configuration,
            deps: [ConfigurationStore],
        },
        {
            provide: ConfigurationSourceStoreService,
            useFactory: () => {
                const result = new ConfigurationSourceStoreService();

                build(result);

                return result;
            },
            deps: [HttpClient],
        },
        {
            provide: ConfigurationLoaderService,
            useClass: ConfigurationLoaderService,
            deps: [ConfigurationSourceStoreService, Configuration],
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            deps: [ConfigurationLoaderService],
            multi: true,
        },
    ];
}
