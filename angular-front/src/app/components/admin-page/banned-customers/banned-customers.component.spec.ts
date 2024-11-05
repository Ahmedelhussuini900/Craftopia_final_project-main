import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedCustomersComponent } from './banned-customers.component';

describe('BannedCustomersComponent', () => {
  let component: BannedCustomersComponent;
  let fixture: ComponentFixture<BannedCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannedCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
