import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Temoignage } from './temoignage';

describe('Temoignage', () => {
  let component: Temoignage;
  let fixture: ComponentFixture<Temoignage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Temoignage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Temoignage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
