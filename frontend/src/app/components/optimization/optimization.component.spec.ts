import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizationComponent } from './optimization.component';

describe('OptimizationComponent', () => {
  let component: OptimizationComponent;
  let fixture: ComponentFixture<OptimizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptimizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptimizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
