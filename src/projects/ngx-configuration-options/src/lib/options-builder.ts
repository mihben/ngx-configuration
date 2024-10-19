import { Injectable } from '@angular/core';
import { Configuration } from '../../../ngx-configuration-core/src/public-api';
import { InvalidConfigurationError } from './invalid-configuration-error';
import { ValidationResult } from './validation-result';
import { RequiredSettingsValidator } from './validators/required-settings-validator';
import { ValueOfValidator } from './validators/value-of-validator';

export interface IOptionsConfigurator<TOptions extends object> {
    configure(configurer: (options: TOptions, configuration: Configuration) => void): IOptionsConfigurator<TOptions>;
    bind(section: string): IOptionsConfigurator<TOptions>;
    validate(validator: (options: TOptions) => ValidationResult): IOptionsConfigurator<TOptions>;
    validateDecorators(): IOptionsConfigurator<TOptions>;
}

@Injectable({ providedIn: 'root' })
export class OptionsBuilder<TOptions extends object> implements IOptionsConfigurator<TOptions> {
    private readonly _configure: ((options: TOptions, configuration: Configuration) => void)[] = [];
    private readonly _validate: ((options: TOptions) => ValidationResult)[] = [];

    constructor(
        private readonly configuration: Configuration,
        private readonly options: TOptions
    ) {}

    public configure(configurer: (options: TOptions, configuration: Configuration) => void): this {
        this._configure.push(configurer);

        return this;
    }

    public bind(section: string): this {
        this._configure.push((options, configuration) => {
            const properties = Object.keys(options);
            for (const property of properties) {
                Reflect.set(options, property, configuration.get(`${section}:${property}`));
            }
        });

        return this;
    }

    public validate(validator: (options: TOptions) => ValidationResult): this {
        this._validate.push(validator);

        return this;
    }

    public validateDecorators(): this {
        this._validate.push(RequiredSettingsValidator.validate);
        this._validate.push(ValueOfValidator.validate);

        return this;
    }

    public build(): TOptions {
        for (const _step of this._configure) {
            _step(this.options, this.configuration);
        }
        for (const validator of this._validate) {
            const validationResult = validator(this.options);
            if (!validationResult.success) throw new InvalidConfigurationError(validationResult.message);
        }

        return this.options;
    }
}
