import { getValueOf } from '../decorators/value-of-decorator';
import { ValidationResult } from '../validation-result';

export class ValueOfValidator {
    public static validate<TOptions extends object>(options: TOptions) {
        const properties = Object.keys(options);
        for (const property of properties) {
            const values = getValueOf(options, property);
            const value = Reflect.get(options, property);
            if (values && value && values.every(v => v != value)) return ValidationResult.invalid(`Value: ${value} is invalid for ${property}`);
        }
        return ValidationResult.valid();
    }
}

