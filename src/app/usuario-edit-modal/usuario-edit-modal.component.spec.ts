import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEditModalComponent } from './usuario-edit-modal.component';

describe('UsuarioEditModalComponent', () => {
  let component: UsuarioEditModalComponent;
  let fixture: ComponentFixture<UsuarioEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuarioEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
