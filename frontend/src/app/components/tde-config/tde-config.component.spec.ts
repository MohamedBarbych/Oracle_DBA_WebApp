import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TDEConfigComponent } from './tde-config.component';

describe('TDEConfigComponent', () => {
  let component: TDEConfigComponent;
  let fixture: ComponentFixture<TDEConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TDEConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TDEConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
