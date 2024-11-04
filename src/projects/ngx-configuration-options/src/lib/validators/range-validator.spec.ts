import { OptionsFaker } from '../../__test_utils__/options-faker';
import { RangeValidator } from './range-validator';

describe('RangeValidator', () => {
    it('[RGV-001] - Valid Range', () => {
        // Arrange
        const options = OptionsFaker.random();

        // Act
        const result = RangeValidator.validate(options);

        // Assert
        expect(result.success).toBeTruthy();
    });

    test.each([-1, 65537])('[RGV-001] - Invalid Range (%p)', (value: number) => {
        // Arrange
        const options = OptionsFaker.setPort(value);

        // Act
        const result = RangeValidator.validate(options);

        // Assert
        expect(result.success).toBeFalsy();
        expect(result.message).toEqual(`Settings port must be between 1 and 65536 (Current value: ${value})`);
    });
});

