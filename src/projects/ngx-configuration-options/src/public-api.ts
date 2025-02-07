/*
 * Public API Surface of ngx-configuration-options
 */

export { provideOptions } from './provideOptions';

export { format, baseAddress } from './lib/decorators/format-decorator';
export { range } from './lib/decorators/range-decorator';
export { required } from './lib/decorators/required-decorator';
export { valueOf, valueOfEnum } from './lib/decorators/value-of-decorator';

export { ValidationResult } from './lib/validation-result';
export { InvalidConfigurationError } from './lib/invalid-configuration-error';
