import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTableSpaceComponent } from './create-table-space.component';

describe('CreateTableSpaceComponent', () => {
  let component: CreateTableSpaceComponent;
  let fixture: ComponentFixture<CreateTableSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTableSpaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTableSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
