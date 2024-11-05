import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedSellersComponent } from './banned-sellers.component';

describe('BannedSellersComponent', () => {
  let component: BannedSellersComponent;
  let fixture: ComponentFixture<BannedSellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannedSellersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannedSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
