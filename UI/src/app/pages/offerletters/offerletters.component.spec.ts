import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferlettersComponent } from './offerletters.component';

describe('OfferlettersComponent', () => {
  let component: OfferlettersComponent;
  let fixture: ComponentFixture<OfferlettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferlettersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferlettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
