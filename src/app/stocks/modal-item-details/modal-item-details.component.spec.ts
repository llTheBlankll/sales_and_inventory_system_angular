import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemDetailsComponent } from './modal-item-details.component';

describe('ModalItemDetailsComponent', () => {
  let component: ModalItemDetailsComponent;
  let fixture: ComponentFixture<ModalItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalItemDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
