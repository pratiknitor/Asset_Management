import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAssetComponent } from './submit-asset.component';

describe('SubmitAssetComponent', () => {
  let component: SubmitAssetComponent;
  let fixture: ComponentFixture<SubmitAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitAssetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
