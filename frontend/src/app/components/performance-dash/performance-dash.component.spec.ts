import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceDashComponent } from './performance-dash.component';

describe('PerformanceDashComponent', () => {
  let component: PerformanceDashComponent;
  let fixture: ComponentFixture<PerformanceDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
