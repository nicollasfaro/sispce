import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { CoursesComponent } from './courses/courses.component';
import { HeaderComponent } from './header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddCourseModalComponent } from './add-course-modal/add-course-modal.component';
import { ListaNceComponent } from './lista-nce/lista-nce.component';
import { CadastroCandidatoComponent } from './cadastro-candidato/cadastro-candidato.component';
import { AdcionarCandidatoModalComponent } from './adcionar-candidato-modal/adcionar-candidato-modal.component';
import { CursosCandidatoTabelaComponent } from './cursos-candidato-tabela/cursos-candidato-tabela.component';
import { VisualizarNceComponent } from './visualizar-nce/visualizar-nce.component';
import { EditarNceComponent } from './editar-nce/editar-nce.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { DatePipe } from '@angular/common';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UsuarioEditModalComponent } from './usuario-edit-modal/usuario-edit-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoursesComponent,
    HeaderComponent,
    AddCourseModalComponent,
    ListaNceComponent,
    CadastroCandidatoComponent,
    AdcionarCandidatoModalComponent,
    CursosCandidatoTabelaComponent,
    VisualizarNceComponent,
    EditarNceComponent,
    NaoAutorizadoComponent,
    CadastroUsuarioComponent,
    ChangePasswordComponent,
    UsuarioEditModalComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  // Certifique-se de que o módulo HTTP está importado
    FormsModule,  // Se você está usando ngModel
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    NgxMaskDirective,
    DragDropModule
  ],
  providers: [ AuthService, provideNgxMask({ /* opções de cfg */ }), DatePipe, { provide: LOCALE_ID, useValue: 'pt' },
    {
    provide: MatDialogRef,
    useValue: {}
  },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
