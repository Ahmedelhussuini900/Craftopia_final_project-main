import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedVarificationComponent } from './need-varification.component';

describe('NeedVarificationComponent', () => {
  let component: NeedVarificationComponent;
  let fixture: ComponentFixture<NeedVarificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeedVarificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeedVarificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
