import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticulesDashComponent } from './particules-dash.component';

describe('ParticulesDashComponent', () => {
  let component: ParticulesDashComponent;
  let fixture: ComponentFixture<ParticulesDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticulesDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticulesDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
