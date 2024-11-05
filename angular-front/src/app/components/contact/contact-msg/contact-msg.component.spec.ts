import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMsgComponent } from './contact-msg.component';

describe('ContactMsgComponent', () => {
  let component: ContactMsgComponent;
  let fixture: ComponentFixture<ContactMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactMsgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
