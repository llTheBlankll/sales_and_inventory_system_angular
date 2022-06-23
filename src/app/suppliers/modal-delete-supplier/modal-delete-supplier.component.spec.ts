import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteSupplierComponent } from './modal-delete-supplier.component';

describe('ModalDeleteSupplierComponent', () => {
  let component: ModalDeleteSupplierComponent;
  let fixture: ComponentFixture<ModalDeleteSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDeleteSupplierComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDeleteSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
