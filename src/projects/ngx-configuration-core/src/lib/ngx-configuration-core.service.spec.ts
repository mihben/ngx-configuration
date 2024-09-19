import { TestBed } from '@angular/core/testing';

import { NgxConfigurationCoreService } from './ngx-configuration-core.service';

describe('NgxConfigurationCoreService', () => {
  let service: NgxConfigurationCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxConfigurationCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
