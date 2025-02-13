import { faker } from '@faker-js/faker';
import { OptionsFaker } from '../../__test_utils__/options-faker';
import { ValueOfValidator } from './value-of-validator';

describe('ValueOfValidator', () => {
    it('[VOV-001] - Valid Array Value', () => {
        // Arrange
        const options = OptionsFaker.random();

        // Act
        const result = ValueOfValidator.validate(options);

        // Assert
        expect(result.success).toBeTruthy();
    });

    it('[VOV-002] - Invalid Array Value', () => {
        // Arrange
        const path = faker.string.sample();
        const options = OptionsFaker.setPath(path);

        // Act
        const result = ValueOfValidator.validate(options);

        // Assert
        expect(result.success).toBeFalsy();
        expect(result.message).toEqual(`Value: ${path} is invalid for path`);
    });

    it('[VOV-003] - Valid Enum Value', () => {
        // Arrange
        const options = OptionsFaker.random();

        // Act
        const result = ValueOfValidator.validate(options);

        // Assert
        expect(result.success).toBeTruthy();
    });

    it('[VOV-004] - Invalid Enum Value', () => {
        // Arrange
        const method = faker.string.sample();
        const options = OptionsFaker.setMethod(method);

        // Act
        const result = ValueOfValidator.validate(options);

        // Assert
        expect(result.success).toBeFalsy();
        expect(result.message).toEqual(`Value: ${method} is invalid for method`);
    });
});

