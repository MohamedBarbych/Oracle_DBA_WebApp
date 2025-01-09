import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASHReportComponent } from './ash-report.component';

describe('ASHReportComponent', () => {
  let component: ASHReportComponent;
  let fixture: ComponentFixture<ASHReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ASHReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ASHReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
