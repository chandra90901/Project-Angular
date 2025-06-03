import { TestBed } from '@angular/core/testing';

import { BusinessSetupService } from './business-setup.service';

describe('BusinessSetupService', () => {
  let service: BusinessSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
