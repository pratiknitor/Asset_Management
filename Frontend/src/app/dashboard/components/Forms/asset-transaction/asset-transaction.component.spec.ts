import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTransactionComponent } from './asset-transaction.component';

describe('AssetTransactionComponent', () => {
  let component: AssetTransactionComponent;
  let fixture: ComponentFixture<AssetTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
