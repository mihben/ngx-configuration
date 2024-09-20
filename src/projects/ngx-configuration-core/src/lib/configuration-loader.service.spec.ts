import { ConfigurationLoaderService } from './configuration-loader.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

describe('Service: [CNL] - ConfigurationLoader', () => {
  let sut: SpectatorService<ConfigurationLoaderService>;

  const factory = createServiceFactory({
    service: ConfigurationLoaderService
  });

  beforeEach(() => (sut = factory()));

  it('[CNL-001] - Creating', () => {
    // Assert
    expect(sut).toBeDefined();
  });
})
