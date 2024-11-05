import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInOfferComponent } from './products-in-offer.component';

describe('ProductsInOfferComponent', () => {
  let component: ProductsInOfferComponent;
  let fixture: ComponentFixture<ProductsInOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsInOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsInOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
