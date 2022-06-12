import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemUpdateComponent } from './modal-item-update.component';

describe('ModalItemUpdateComponent', () => {
  let component: ModalItemUpdateComponent;
  let fixture: ComponentFixture<ModalItemUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalItemUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalItemUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
