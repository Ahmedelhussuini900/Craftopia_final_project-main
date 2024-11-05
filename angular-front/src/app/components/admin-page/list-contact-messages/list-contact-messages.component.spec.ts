import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContactMessagesComponent } from './list-contact-messages.component';

describe('ListContactMessagesComponent', () => {
  let component: ListContactMessagesComponent;
  let fixture: ComponentFixture<ListContactMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListContactMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListContactMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
