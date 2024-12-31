import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerifNotifComponent } from './email-verif-notif.component';

describe('EmailVerifNotifComponent', () => {
  let component: EmailVerifNotifComponent;
  let fixture: ComponentFixture<EmailVerifNotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailVerifNotifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailVerifNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
