import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemAddComponent } from './modal-item-add.component';

describe('ModalItemAddComponent', () => {
  let component: ModalItemAddComponent;
  let fixture: ComponentFixture<ModalItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalItemAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
