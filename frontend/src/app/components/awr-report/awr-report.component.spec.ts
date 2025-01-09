import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwrReportComponent } from './awr-report.component';

describe('AwrReportComponent', () => {
  let component: AwrReportComponent;
  let fixture: ComponentFixture<AwrReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwrReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
