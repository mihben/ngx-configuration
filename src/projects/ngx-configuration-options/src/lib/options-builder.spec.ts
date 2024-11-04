import { OptionsBuilder } from './options-builder';
import { TestOptions } from '../__test_utils__/test-options';
import { faker } from '@faker-js/faker';
import { Configuration } from '../../../ngx-configuration-core/src/public-api';
import { InvalidConfigurationError } from './invalid-configuration-error';
import { ValidationResult } from './validation-result';
import { MockService } from 'ng-mocks';

describe('OptionsBuilder', () => {
    const createSUT = (configuration?: Configuration) => OptionsBuilder.create(configuration ?? new Configuration(), new TestOptions());

    it('[OPB-001] - Configure Options', () => {
        // Arrange
        const sut = createSUT();
        const settings = faker.string.sample();

        // Act
        const result = sut.configure(options => (options.baseAddress = settings)).build();

        // Assert
        expect(result.baseAddress).toEqual(settings);
    });

    it('[OPB-002] - Multiple Configure Steps', () => {
        // Arrange
        const sut = createSUT();
        const settings = faker.string.sample();

        const builder = sut.configure(options => (options.baseAddress = faker.string.sample()));

        // Act
        const result = builder.configure(options => (options.baseAddress = settings)).build();

        // Assert
        expect(result.baseAddress).toEqual(settings);
    });

    it('[OPB-003] - Multiple Configure Steps', () => {
        // Arrange
        const sut = createSUT();
        const settings = faker.string.sample();

        // Act
        const result = sut
            .configure(options => (options.baseAddress = faker.string.sample()))
            .configure(options => (options.baseAddress = settings))
            .build();

        // Assert
        expect(result.baseAddress).toEqual(settings);
    });

    it('[OPB-004] - Bindig to Configuration Section', () => {
        // Arrange
        const section = faker.string.sample();
        const settings = faker.string.sample();
        const sut = createSUT(
            MockService(Configuration, {
                get: key => {
                    if (key == `${section}:baseAddress`) return settings;
                    else return undefined;
                },
            })
        );

        // Act
        const result = sut.bind(section).build();

        // Assert
        expect(result.baseAddress).toEqual(settings);
    });

    it('[OPB-005] - Configure after Binding', () => {
        // Arrange
        const sut = createSUT(
            MockService(Configuration, {
                get: key => {
                    if (key == `${section}:baseAddress`) return faker.string.sample();
                    else return undefined;
                },
            })
        );
        const section = faker.string.sample();
        const settings = faker.string.sample();

        // Act
        const result = sut
            .bind(section)
            .configure(options => (options.baseAddress = settings))
            .build();

        // Assert
        expect(result.baseAddress).toEqual(settings);
    });

    it('[OPB-006] - Invalid settings', () => {
        // Arrange
        const sut = createSUT();
        const settings = faker.string.sample();

        // Act
        // Assert
        expect(() =>
            sut
                .configure(options => (options.baseAddress = settings))
                .validate(options => ValidationResult.invalid(`Invalid settings: ${options.baseAddress}`))
                .build()
        ).toThrow(InvalidConfigurationError);
    });

    it('[OPB-007] - Valid settings', () => {
        // Arrange
        const sut = createSUT();
        const settings = faker.string.sample();

        // Act
        // Assert
        expect(() =>
            sut
                .configure(options => (options.baseAddress = settings))
                .validate(() => ValidationResult.valid())
                .build()
        ).not.toThrow(InvalidConfigurationError);
    });
});
