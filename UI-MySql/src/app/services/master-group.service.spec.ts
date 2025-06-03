import { TestBed } from '@angular/core/testing';

import { MasterGroupService } from './master-group.service';

describe('MasterGroupService', () => {
  let service: MasterGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
