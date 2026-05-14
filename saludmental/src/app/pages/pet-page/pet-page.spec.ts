import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetPage } from './pet-page';

describe('PetPage', () => {
  let component: PetPage;
  let fixture: ComponentFixture<PetPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PetPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
