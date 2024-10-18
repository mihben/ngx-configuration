import { Injectable } from '@angular/core';
import { Configuration } from '../../../ngx-configuration-core/src/public-api';
import { InvalidConfigurationError } from './invalid-configuration-error';
import { ValidationResult } from './validation-result';
import { RequiredSettingsValidator } from './validators/required-settings-validator';

@Injectable()
export class OptionsBuilder<TOptions extends object> {
    private readonly _configure: ((options: TOptions, configuration: Configuration) => void)[] = [];
    private readonly _validate: ((options: TOptions) => ValidationResult)[] = [];

    constructor(private readonly configuration: Configuration) {}

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

    public build(factory: new () => TOptions): TOptions {
        const result = new factory();

        for (const _step of this._configure) {
            _step(result, this.configuration);
        }
        for (const validator of this._validate) {
            const validationResult = validator(result);
            if (!validationResult.success) throw new InvalidConfigurationError(validationResult.message);
        }

        return result;
    }

    public validate(validator: (options: TOptions) => ValidationResult): this {
        this._validate.push(validator);

        return this;
    }

    public validateDecorators(): this {
        this._validate.push(RequiredSettingsValidator.validate);

        return this;
    }
}

