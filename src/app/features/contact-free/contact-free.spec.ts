import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFree } from './contact-free';

describe('ContactFree', () => {
  let component: ContactFree;
  let fixture: ComponentFixture<ContactFree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
