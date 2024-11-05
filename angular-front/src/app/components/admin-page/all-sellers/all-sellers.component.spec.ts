import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSellersComponent } from './all-sellers.component';

describe('AllSellersComponent', () => {
  let component: AllSellersComponent;
  let fixture: ComponentFixture<AllSellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSellersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
