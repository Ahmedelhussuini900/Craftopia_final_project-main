import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCustomerInformationComponent } from './show-customer-information.component';

describe('ShowCustomerInformationComponent', () => {
  let component: ShowCustomerInformationComponent;
  let fixture: ComponentFixture<ShowCustomerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCustomerInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCustomerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
