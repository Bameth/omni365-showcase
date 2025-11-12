import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Avantage } from './avantage';

describe('Avantage', () => {
  let component: Avantage;
  let fixture: ComponentFixture<Avantage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Avantage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Avantage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
