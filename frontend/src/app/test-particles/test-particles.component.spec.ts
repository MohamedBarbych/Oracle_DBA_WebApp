import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestParticlesComponent } from './test-particles.component';

describe('TestParticlesComponent', () => {
  let component: TestParticlesComponent;
  let fixture: ComponentFixture<TestParticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestParticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestParticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
