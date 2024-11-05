import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSellerContactComponent } from './show-seller-contact.component';

describe('ShowSellerContactComponent', () => {
  let component: ShowSellerContactComponent;
  let fixture: ComponentFixture<ShowSellerContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSellerContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSellerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
