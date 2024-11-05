import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMAccountComponent } from './customer-m-account.component';

describe('CustomerMAccountComponent', () => {
  let component: CustomerMAccountComponent;
  let fixture: ComponentFixture<CustomerMAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerMAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
