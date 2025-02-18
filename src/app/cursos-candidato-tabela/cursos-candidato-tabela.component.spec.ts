import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosCandidatoTabelaComponent } from './cursos-candidato-tabela.component';

describe('CursosCandidatoTabelaComponent', () => {
  let component: CursosCandidatoTabelaComponent;
  let fixture: ComponentFixture<CursosCandidatoTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CursosCandidatoTabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosCandidatoTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
