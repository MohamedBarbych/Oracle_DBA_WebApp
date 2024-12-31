import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycTriggerPageComponent } from './kyc-trigger-page.component';

describe('KycTriggerPageComponent', () => {
  let component: KycTriggerPageComponent;
  let fixture: ComponentFixture<KycTriggerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KycTriggerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycTriggerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
