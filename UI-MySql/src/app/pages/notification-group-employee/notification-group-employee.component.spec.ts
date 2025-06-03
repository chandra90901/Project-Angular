import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationGroupEmployeeComponent } from './notification-group-employee.component';

describe('NotificationGroupEmployeeComponent', () => {
  let component: NotificationGroupEmployeeComponent;
  let fixture: ComponentFixture<NotificationGroupEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationGroupEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationGroupEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
