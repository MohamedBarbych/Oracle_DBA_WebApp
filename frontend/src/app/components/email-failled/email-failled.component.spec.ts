import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFailledComponent } from './email-failled.component';

describe('EmailFailledComponent', () => {
  let component: EmailFailledComponent;
  let fixture: ComponentFixture<EmailFailledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailFailledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailFailledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
