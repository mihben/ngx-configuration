import { TestConfigurationSource } from '../__test_utils__/test-configuration-source';
import { ConfigurationLoaderService } from './configuration-loader.service';
import { createServiceFactory } from '@ngneat/spectator';
import { ConfigurationSourceStoreService } from './configuration-source-store.service';
import { faker } from '@faker-js/faker';
import { Configuration } from './configuration';

describe('Service: [CNL] - ConfigurationLoader', () => {
  let configuration: Configuration | undefined = undefined;

  const factory = createServiceFactory({
    service: ConfigurationLoaderService,
    providers: [
      {
        provide: Configuration,
        useFactory: () => {
          configuration = new Configuration();
          return configuration;
        }
      }
    ]
  });

  it('[CNL-001] - Load configuration from registered sources', async () => {
    // Arrange
    const key = faker.string.sample();
    const value = faker.string.sample();
    const sut = factory();

    const storeMock = sut.inject(ConfigurationSourceStoreService);
    jest.spyOn(storeMock, 'sources', 'get').mockReturnValue([new TestConfigurationSource(key, value)]);

    // Act
    await sut.service.loadAsync();

    // Assert
    expect(configuration!.get(key)).toEqual(value);
  });
})
