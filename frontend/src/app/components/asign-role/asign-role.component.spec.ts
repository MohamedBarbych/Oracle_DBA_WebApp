import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignRoleComponent } from './asign-role.component';

describe('AsignRoleComponent', () => {
  let component: AsignRoleComponent;
  let fixture: ComponentFixture<AsignRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
