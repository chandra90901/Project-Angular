import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferletterFormComponent } from './offerletter-form.component';

describe('OfferletterFormComponent', () => {
  let component: OfferletterFormComponent;
  let fixture: ComponentFixture<OfferletterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferletterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferletterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
