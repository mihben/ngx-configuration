import { getRequired } from '../decorators/required-decorators';
import { ValidationResult } from '../validation-result';

export class RequiredSettingsValidator {
    public static validate<TOptions extends object>(options: TOptions): ValidationResult {
        const properties = Object.keys(options);
        for (const property of properties) {
            const required = getRequired(options, property);
            if (required && !Reflect.get(options, property)) return ValidationResult.invalid(required.message);
        }
        return ValidationResult.valid();
    }
}

