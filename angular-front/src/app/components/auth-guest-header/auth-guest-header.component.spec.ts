import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGuestHeaderComponent } from './auth-guest-header.component';

describe('AuthGuestHeaderComponent', () => {
  let component: AuthGuestHeaderComponent;
  let fixture: ComponentFixture<AuthGuestHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthGuestHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthGuestHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
