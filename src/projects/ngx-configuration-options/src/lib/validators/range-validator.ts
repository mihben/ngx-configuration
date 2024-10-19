import { getRange } from '../decorators/range-decorator';
import { ValidationResult } from '../validation-result';

export class RangeValidator {
    public static validate<TOpions extends object>(options: TOpions): ValidationResult {
        const properties = Object.keys(options);
        for (const property of properties) {
            const range = getRange(options, property);
            const value = Reflect.get(options, property) as number;
            if (range && value && (!range.min || value < range.min || !range.max || value > range.max))
                return ValidationResult.invalid(`Settings ${property} must be between ${range.min} and ${range.max} (Current value: ${value})`);
        }

        return ValidationResult.valid();
    }
}

