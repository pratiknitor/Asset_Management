import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableGridTableComponent } from './reusable-grid-table.component';

describe('ReusableGridTableComponent', () => {
  let component: ReusableGridTableComponent;
  let fixture: ComponentFixture<ReusableGridTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableGridTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableGridTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
