import { faker } from "@faker-js/faker";
import { Configuration } from "./configuration";
import { ConfigurationStoreFaker } from "../__test_utils__/configuration-store-faker";

describe('Service: [CNF] - Configuration', () => {
    it('[CNF-001] - Get configuration', () => {
        // Arrange
        const key = faker.string.sample();
        const value = faker.string.sample();

        const sut = new Configuration();
        sut.initialize([ConfigurationStoreFaker.with(key, faker.string.sample()), ConfigurationStoreFaker.with(key, value)]);

        // Act
        const result = sut.get(key);

        // Assert
        expect(result).toEqual(value);
    });

    it('[CNF-002] - Get not existing configuration', () => {
        // Arrange
        const sut = new Configuration();
        sut.initialize([ConfigurationStoreFaker.with(faker.string.sample(), faker.string.sample())]);

        // Act
        const result = sut.get(faker.string.sample());

        // Assert
        expect(result).toBeUndefined();
    });
});