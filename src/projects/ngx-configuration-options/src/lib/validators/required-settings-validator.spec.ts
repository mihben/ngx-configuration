import { OptionsFaker } from '../../__test_utils__/options-faker';
import { RequiredSettingsValidator } from './required-settings-validator';

describe('RequiredSettingsValidator', () => {
    it('[RSV-001] - Valid Configuration', () => {
        // Arrange
        const options = OptionsFaker.random();

        // Act
        const result = RequiredSettingsValidator.validate(options);

        // Assert
        expect(result.success).toBeTruthy();
    });

    test.each([undefined, null, ''])('[RSV-002] - Invalid Configuration (%1)', value => {
        // Arrange
        const options = OptionsFaker.setBaseAddress(value);

        // Act
        const result = RequiredSettingsValidator.validate(options);

        // Assert
        expect(result.success).toBeFalsy();
        expect(result.message).toEqual('Required configuration is not defined.');
    });

    it('[RSV-003] - Set Message', () => {
        // Arrange
        const options = OptionsFaker.setMethod(undefined);

        // Act
        const result = RequiredSettingsValidator.validate(options);

        // Assert
        expect(result.message).toEqual('Method is required.');
    });
});

