import { faker } from '@faker-js/faker';
import { OptionsFaker } from '../../__test_utils__/options-faker';
import { FormatValidator } from './format-validator';

describe('FormatValidator', () => {
    it('[RGV-001] - Valid Format', () => {
        // Arrange
        const options = OptionsFaker.random();

        // Act
        const result = FormatValidator.validate(options);

        // Assert
        expect(result.success).toBeTruthy();
    });

    it('[RGV-002] - Invalid Format', () => {
        // Arrange
        const value = faker.string.sample();
        const options = OptionsFaker.setBaseAddress(value);

        // Act
        const result = FormatValidator.validate(options);

        // Assert
        expect(result.success).toBeFalsy();
        expect(result.message).toEqual(`Settings ${value} is invalid for baseAddress`);
    });
});

