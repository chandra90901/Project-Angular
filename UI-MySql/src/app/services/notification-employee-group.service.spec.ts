import { TestBed } from '@angular/core/testing';

import { NotificationEmployeeGroupService } from './notification-employee-group.service';

describe('NotificationEmployeeGroupService', () => {
  let service: NotificationEmployeeGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationEmployeeGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
