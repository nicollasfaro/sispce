import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseModalComponent } from '../add-course-modal/add-course-modal.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  newCourse: any = { name: '' };
  editingCourse: any = null;

  displayedColumns: string[] = ['nOrd', 'posto', 'conhecimentoEsp', 'aplicacao', 'acoes'];

  constructor(private coursesService: CoursesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  addCourse(): void {
    this.coursesService.addCourse(this.newCourse).subscribe(course => {
      this.courses.push(course);
      this.newCourse = { name: ''};
    });
  }

  editCourse(course: any): void {
    this.editingCourse = { ...course };
  }

  updateCourse(): void {
    if (this.editingCourse) {
      this.coursesService.updateCourse(this.editingCourse).subscribe(updatedCourse => {
        const index = this.courses.findIndex(course => course.id === updatedCourse.id);
        if (index !== -1) {
          this.courses[index] = updatedCourse;
        }
        this.editingCourse = null;
      });
    }
  }

  deleteCourse(id: number): void {
    this.coursesService.deleteCourse(id).subscribe(() => {
      this.courses = this.courses.filter(course => course.id !== id);
    });
  }

  openAddCourseModal(): void {
    const dialogRef = this.dialog.open(AddCourseModalComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado');
      // Atualizar a lista de cursos aqui se necessário
    });
  }
}
