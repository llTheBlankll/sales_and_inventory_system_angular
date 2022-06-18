import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateSupplierComponent } from './modal-update-supplier.component';

describe('ModalUpdateSupplierComponent', () => {
  let component: ModalUpdateSupplierComponent;
  let fixture: ComponentFixture<ModalUpdateSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
