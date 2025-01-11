import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticulesComponent } from './particules.component';

describe('ParticulesComponent', () => {
  let component: ParticulesComponent;
  let fixture: ComponentFixture<ParticulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
