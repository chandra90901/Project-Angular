import { TestBed } from '@angular/core/testing';

import { AnnoncementService } from './announcement.service';

describe('AnnoncementService', () => {
  let service: AnnoncementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnoncementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
