import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ConfigurationSourceStoreService } from './configuration-source-store.service';
import { TestConfigurationSource } from '../__test_utils__/test-configuration-source';
import { faker } from '@faker-js/faker';

describe('Service: ConfigurationSourceStore', () => {
    let sut: SpectatorService<ConfigurationSourceStoreService>;
    const factory = createServiceFactory({
        service: ConfigurationSourceStoreService,
    });

    beforeEach(() => (sut = factory()));

    it('[CSS-001] - Register source', () => {
        // Arrange
        const source = new TestConfigurationSource(faker.string.sample(), faker.string.sample());

        // Act
        sut.service.register(source);

        // Assert
        expect(sut.service.sources).toEqual([source]);
    });

    it('[CSS-002] - Clear sources', () => {
        // Arrange
        const source = new TestConfigurationSource(faker.string.sample(), faker.string.sample());
        sut.service.register(source);

        // Act
        sut.service.clear();

        // Assert
        expect(sut.service.sources).toEqual([]);
    });

    it('[CSS-003] - Get sources', () => {
        // Arrange
        const sources = [new TestConfigurationSource(faker.string.sample(), faker.string.sample()), new TestConfigurationSource(faker.string.sample(), faker.string.sample())];

        sut.service.register(sources[1]);
        sut.service.register(sources[0]);

        // Act
        const result = sut.service.sources;

        // Assert
        expect(result[0]).toBe(sources[1]);
        expect(result[1]).toBe(sources[0]);
    });
});
