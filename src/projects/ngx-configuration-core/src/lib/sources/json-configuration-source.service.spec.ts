import { TestBed } from '@angular/core/testing';

import { JsonConfigurationSourceService } from './json-configuration-source.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

describe('JsonConfigurationSourceService', () => {
  it('[FCS-001] - Read configuration', async () => {
    // Arrange
    const sut = new JsonConfigurationSourceService('../../__test_utils__/test-file.json');

    // Act
    const result = await sut.loadAsync();

    // Assert
    expect("BaseAddress").toEqual("http://test.com/");
  })
});
