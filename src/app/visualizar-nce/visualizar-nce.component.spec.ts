import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarNceComponent } from './visualizar-nce.component';

describe('VisualizarNceComponent', () => {
  let component: VisualizarNceComponent;
  let fixture: ComponentFixture<VisualizarNceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizarNceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarNceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
