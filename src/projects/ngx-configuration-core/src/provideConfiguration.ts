import { APP_INITIALIZER, inject, Provider } from "@angular/core";
import { Configuration, ConfigurationLoaderService, ConfigurationSourceStoreService, ConfigurationStore, JsonConfigurationSourceOptions, JsonConfigurationSourceService } from "./public-api";
import { HttpClient } from "@angular/common/http";

export const defaultConfiguration = (store: ConfigurationSourceStoreService, environment: string) => {
    const options = new JsonConfigurationSourceOptions();
    options.path = "appsettings.json";
    store.register(new JsonConfigurationSourceService(inject(HttpClient), options));

    if (environment) {
        const optionsDev = new JsonConfigurationSourceOptions();
        optionsDev.path = `appsettings.${environment}.json`;
        optionsDev.optional = true;
        store.register(new JsonConfigurationSourceService(inject(HttpClient), optionsDev));
    }
}

export function provideConfiguration(build: (store: ConfigurationSourceStoreService) => void): Provider[] {
    return [
        {
            provide: ConfigurationStore,
            useClass: ConfigurationStore
        },
        {
            provide: Configuration,
            useClass: Configuration,
            deps: [ConfigurationStore]
        },
        {
            provide: ConfigurationSourceStoreService,
            useFactory: () => {
                var result = new ConfigurationSourceStoreService();

                build(result);

                return result;
            },
            deps: [HttpClient]
        },
        {
            provide: ConfigurationLoaderService,
            useClass: ConfigurationLoaderService,
            deps: [ConfigurationSourceStoreService, Configuration]
        },
        {
            provide: APP_INITIALIZER,
            useFactory: (loader: ConfigurationLoaderService) => loader.loadAsync(),
            deps: [ConfigurationLoaderService],
            multi: true
        }
    ];
}