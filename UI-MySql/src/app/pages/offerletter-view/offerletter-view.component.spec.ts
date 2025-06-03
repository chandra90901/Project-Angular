import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferletterViewComponent } from './offerletter-view.component';

describe('OfferletterViewComponent', () => {
  let component: OfferletterViewComponent;
  let fixture: ComponentFixture<OfferletterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferletterViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferletterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
