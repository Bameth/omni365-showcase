import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYou } from './thankyou';

describe('Thankyou', () => {
  let component: ThankYou;
  let fixture: ComponentFixture<ThankYou>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThankYou]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThankYou);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
