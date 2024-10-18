import { createServiceFactory } from '@ngneat/spectator/jest';
import { OptionsBuilder } from './options-builder';
import { TestEnum, TestOptions } from '../__test_utils__/test-options';
import { faker } from '@faker-js/faker';
import { Configuration } from '../../../ngx-configuration-core/src/public-api';
import { InvalidConfigurationError } from './invalid-configuration-error';
import { ValidationResult } from './validation-result';

describe('OptionsBuilder', () => {
    const createSUT = createServiceFactory({
        service: OptionsBuilder<TestOptions>,
        mocks: [Configuration],
    });

    it('[OPB-001] - Configure Options', () => {
        // Arrange
        const sut = createSUT();
        const settings = faker.string.sample();

        // Act
        const result = sut.service.configure(options => (options.baseAddress = settings)).build(TestOptions);

        // Assert
        expect(result.baseAddress).toEqual(settings);
    });

    it('[OPB-002] - Multiple Configure Steps', () => {
        // Arrange
        const sut = createSUT();
        const settings = faker.string.sample();

        const builder = sut.service.configure(options => (options.baseAddress = faker.string.sample()));

        // Act
        const result = builder.configure(options => (options.baseAddress = settings)).build(TestOptions);

        // Assert
        expect(result.baseAddress).toEqual(settings);
    });

    it('[OPB-003] - Multiple Configure Steps', () => {
        // Arrange
        const sut = createSUT();
        const settings = faker.string.sample();

        // Act
        const result = sut.service
            .configure(options => (options.baseAddress = faker.string.sample()))
            .configure(options => (options.baseAddress = settings))
            .build(TestOptions);

        // Assert
        expect(result.baseAddress).toEqual(settings);
    });

    it('[OPB-004] - Bindig to Configuration Section', () => {
        // Arrange
        const sut = createSUT();
        const section = faker.string.sample();
        const settings = faker.string.sample();

        const configurationMock = sut.inject(Configuration);
        jest.spyOn(configurationMock, 'get').mockImplementation(key => {
            if (key == `${section}:baseAddress`) return settings;
            else return undefined;
        });

        // Act
        const result = sut.service.bind(section).build(TestOptions);

        // Assert
        expect(result.baseAddress).toEqual(settings);
    });

    it('[OPB-005] - Configure after Binding', () => {
        // Arrange
        const sut = createSUT();
        const section = faker.string.sample();
        const settings = faker.string.sample();

        const configurationMock = sut.inject(Configuration);
        jest.spyOn(configurationMock, 'get').mockImplementation(key => {
            if (key == `${section}:settings`) return faker.string.sample();
            else return undefined;
        });

        // Act
        const result = sut.service
            .bind(section)
            .configure(options => (options.baseAddress = settings))
            .build(TestOptions);

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
            sut.service
                .configure(options => (options.baseAddress = settings))
                .validate(options => ValidationResult.invalid(`Invalid settings: ${options.baseAddress}`))
                .build(TestOptions)
        ).toThrow(InvalidConfigurationError);
    });

    it('[OPB-007] - Valid settings', () => {
        // Arrange
        const sut = createSUT();
        const settings = faker.string.sample();

        // Act
        // Assert
        expect(() =>
            sut.service
                .configure(options => (options.baseAddress = settings))
                .validate(() => ValidationResult.valid())
                .build(TestOptions)
        ).not.toThrow(InvalidConfigurationError);
    });
});

