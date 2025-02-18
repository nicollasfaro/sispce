import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-usuario-edit-modal',
  templateUrl: './usuario-edit-modal.component.html',
  styleUrls: ['./usuario-edit-modal.component.css']
})
export class UsuarioEditModalComponent implements OnInit {
  usuarioForm!: FormGroup;
  organizacoesMilitares: any[] = [];
  originalOrganizacoesMilitares: any[] = [];  // Backup da lista original
  UserOm: any;
  filteredOrganizacoesMilitares: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<UsuarioEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.usuarioForm = new FormGroup({
      nome: new FormControl(this.data.userId.username, Validators.required),
      organizacaoMilitar: new FormControl(this.data.userId.organizacaoMilitar, Validators.required),
    });
    console.log(this.data.userId.organizacaoMilitar);
    this.UserOm = this.data.userId.organizacaoMilitar.nomeInstituicao;  
    this.loadOms();
  }
  
  loadOms(){
    this.dataService.getOms().subscribe(
      (data) => {
        this.organizacoesMilitares = data;
        this.organizacoesMilitares.sort((a, b) => a.nomeInstituicao.localeCompare(b.nomeInstituicao));
        this.originalOrganizacoesMilitares = [...this.organizacoesMilitares];
        console.log(this.organizacoesMilitares);
      },
      (error) => {
        console.error('Erro ao carregar oms', error);
      }
    );
  }

  filterOrganizacoesMilitares(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    
    this.organizacoesMilitares = this.originalOrganizacoesMilitares.filter(om =>
      om.nomeInstituicao.toLowerCase().includes(value.toLowerCase())
    );
  }

  salvarUsuario(): void {
    // Salvar os dados do usuário
    this.dialogRef.close(this.usuarioForm.value);
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}