import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToBeDeliveredOtemsComponent } from './to-be-delivered-otems.component';

describe('ToBeDeliveredOtemsComponent', () => {
  let component: ToBeDeliveredOtemsComponent;
  let fixture: ComponentFixture<ToBeDeliveredOtemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToBeDeliveredOtemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToBeDeliveredOtemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
