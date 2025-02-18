import { Component } from '@angular/core';

export interface Cursos {
  curso: string;
  escola: string;
  local: string;
  dtConclusao: string;
  grau: string;
  mencao: string;
  classificacao: string;
}

@Component({
  selector: 'app-cursos-candidato-tabela',
  templateUrl: './cursos-candidato-tabela.component.html',
  styleUrl: './cursos-candidato-tabela.component.css'
})
export class CursosCandidatoTabelaComponent {
  displayedColumns: string[] = ['curso', 'escola', 'local', 'actions'];
  courses: Cursos[] = [];
  newCourse: Cursos = { curso: '', escola: '', local: '', dtConclusao: '', grau:'', mencao:'', classificacao:'' };
  addCourse() {
    if (this.newCourse.curso && this.newCourse.escola && this.newCourse.local) {
      this.courses.push({ ...this.newCourse });
      this.newCourse = { curso: '', escola: '', local: '', dtConclusao: '', grau:'', mencao:'', classificacao:'' };
    }
  }

  editCourse(cursos: Cursos) {
    // Lógica para editar o curso
  }
  deleteCourse(index: number) {
    this.courses.splice(index, 1);
  }
}
