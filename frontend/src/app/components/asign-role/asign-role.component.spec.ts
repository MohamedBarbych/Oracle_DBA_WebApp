import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRoleComponent } from './asign-role.component';

describe('AsignRoleComponent', () => {
  let component: AssignRoleComponent;
  let fixture: ComponentFixture<AssignRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
