import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemDeleteComponent } from './modal-item-delete.component';

describe('ModalItemDeleteComponent', () => {
  let component: ModalItemDeleteComponent;
  let fixture: ComponentFixture<ModalItemDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalItemDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalItemDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
