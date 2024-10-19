import { APP_INITIALIZER, Provider } from '@angular/core';
import { IOptionsConfigurator, OptionsBuilder } from './lib/options-builder';
import { Configuration } from '../../ngx-configuration-core/src/lib/configuration';

export function provideOptions<TOptions extends object>(type: new () => TOptions, build: (builder: IOptionsConfigurator<TOptions>) => IOptionsConfigurator<TOptions>): Provider[] {
    return [
        {
            provide: type,
            useFactory: (configuration: Configuration) => {
                return (build(new OptionsBuilder<TOptions>(configuration, new type())) as OptionsBuilder<TOptions>).build();
            },
            deps: [Configuration, APP_INITIALIZER],
        },
    ];
}
