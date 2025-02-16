import { getFormat } from '../decorators/format-decorator';
import { ValidationResult } from '../validation-result';

export class FormatValidator {
    public static validate<TOptions extends object>(options: TOptions) {
        const properties = Object.keys(options);
        for (const property of properties) {
            const format = getFormat(options, property);
            const value = Reflect.get(options, property) as string;
            if (format && value && !new RegExp(format).test(value)) return ValidationResult.invalid(`Settings ${value} is invalid for ${property}`);
        }

        return ValidationResult.valid();
    }
}
