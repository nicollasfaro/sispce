import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNceComponent } from './editar-nce.component';

describe('EditarNceComponent', () => {
  let component: EditarNceComponent;
  let fixture: ComponentFixture<EditarNceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarNceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarNceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
