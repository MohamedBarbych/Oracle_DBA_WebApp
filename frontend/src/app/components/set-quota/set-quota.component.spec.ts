import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetQuotaComponent } from './set-quota.component';

describe('SetQuotaComponent', () => {
  let component: SetQuotaComponent;
  let fixture: ComponentFixture<SetQuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetQuotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetQuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
