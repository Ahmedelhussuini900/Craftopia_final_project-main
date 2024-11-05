import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersOrdersToBeDoneComponent } from './sellers-orders-to-be-done.component';

describe('SellersOrdersToBeDoneComponent', () => {
  let component: SellersOrdersToBeDoneComponent;
  let fixture: ComponentFixture<SellersOrdersToBeDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellersOrdersToBeDoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellersOrdersToBeDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
