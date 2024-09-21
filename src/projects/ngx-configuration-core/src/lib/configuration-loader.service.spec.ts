import { TestConfigurationSource } from '../__test_utils__/test-configuration-source';
import { ConfigurationLoaderService } from './configuration-loader.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ConfigurationSourceStoreService } from './configuration-source-store.service';
import { IConfigurationSource } from './configuration-source';
import { faker } from '@faker-js/faker';
import { ConfigurationStore } from './configuration-store';

describe('Service: [CNL] - ConfigurationLoader', () => {
  let sut: SpectatorService<ConfigurationLoaderService>;

  const factory = createServiceFactory({
    service: ConfigurationLoaderService
  });

  beforeEach(() => (sut = factory()));

  it('[CNL-001] - Load configuration from registered sources', async () => {
    // Arrange
    const sources = [new TestConfigurationSource(faker.string.sample(), faker.string.sample()), new TestConfigurationSource(faker.string.sample(), faker.string.sample())];

    const storeMock = sut.inject(ConfigurationSourceStoreService);
    jest.spyOn(storeMock, 'sources', 'get').mockReturnValue(sources);

    // Act
    await sut.service.loadAsync();

    // Assert
    expect(sources[0].loaded).toBeTruthy();
    expect(sources[1].loaded).toBeTruthy();
  });
})
