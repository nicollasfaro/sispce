import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adcionar-candidato-modal',
  templateUrl: './adcionar-candidato-modal.component.html',
  styleUrl: './adcionar-candidato-modal.component.css',
})
export class AdcionarCandidatoModalComponent implements OnInit {
  candidates: any[] = [];
  nce: any[] = [];
  selectedCandidate: any[] = [];
  selectedNCE: any;

  constructor(
    public dialogRef: MatDialogRef<AdcionarCandidatoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public course: string,
    private dataService: DataService,private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dataService.getCandidatos2().subscribe((data: any) => {
      this.candidates = data;
    });

  }

  addCandidateToCourse(course: any) {
    const candidatoData = {
      ...this.selectedCandidate,
      nceId: course // Associar o ID da NCE ao candidato
    };
    console.log('entrei', this.selectedCandidate, course)

      this.dataService.addCandidateToNce(candidatoData).subscribe(
        (response) => {
          console.log('Candidato salvo com sucesso!', response);
          this.snackBar.open('Candidato incluído com sucesso!', 'Fechar', {
            duration: 3000,
          });
          this.close()  // Fechar o modal
        },
        (error) => {
          console.error('Erro ao salvar candidato', error);
          this.snackBar.open('Erro ao incluir candidato, verifique se tem algum candidato selecionado', 'Fechar', {
            duration: 3000,
          });
        }
      );
      
      // console.log(
      //   `Candidato ${this.selectedCandidate} incluído no curso ${this.selectedNCE}`
      // );
      // this.close()
      
      
    
  }

  close(): void {
    this.dialogRef.close();
  }
}
