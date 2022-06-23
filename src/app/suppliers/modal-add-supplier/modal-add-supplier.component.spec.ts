import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddSupplierComponent } from './modal-add-supplier.component';

describe('ModalAddSupplierComponent', () => {
  let component: ModalAddSupplierComponent;
  let fixture: ComponentFixture<ModalAddSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAddSupplierComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAddSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
