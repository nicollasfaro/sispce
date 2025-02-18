import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioEditModalComponent } from '../usuario-edit-modal/usuario-edit-modal.component';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})



export class CadastroUsuarioComponent {
  users: any[] = []; // Lista de usuários
  userForm!: FormGroup;
  availableRoles = ['Administrador', 'Criador', 'Aprovador']; // Defina os papéis disponíveis
  organizacoesMilitares: any[] =[]; // Carregue as organizações militares
  groupedUsers: any = {}; // Usuários agrupados por organização militar
  selectedOrganization: string = '';  // Organização militar selecionada
  organizations: string[] = [];  // Lista de organizações disponíveis
  originalOrganizacoesMilitares: any[] = [];
  roleMapping: { [key: string]: string } = {
    'ROLE_ADMIN': 'Administrador',
    'ROLE_APROVADOR': 'Aprovador',
    'ROLE_BASIC': 'Criador'
    // Adicione mais mapeamentos conforme necessário
  };
  
  constructor(private fb: FormBuilder, private authService: AuthService, 
    private dataService: DataService, private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      organizacaoMilitar: ['', Validators.required],
      roles: ['', Validators.required],
    });
    this.loadOms()
    this.loadUsers(); // Carregar os usuários ao iniciar a tela
    
  }

  filterOrganizacoesMilitares(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    
    this.organizacoesMilitares = this.originalOrganizacoesMilitares.filter(om =>
      om.nomeInstituicao.toLowerCase().includes(value.toLowerCase())
    );
  }
  
  // Carregar as organizações militares
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

  // Método para carregar os usuários
  loadUsers(): void {
    this.dataService.getUser().subscribe((data) => {
      this.users = data;
      // Agrupar usuários pela organização militar
      this.groupedUsers = this.groupByOrganization(this.users);
      
      // Preencher a lista de organizações
      this.organizations = Object.keys(this.groupedUsers);
      console.log(this.users)
    });
  }

  // Função para agrupar usuários por organização militar
  groupByOrganization(users: any[]): any {
    return users.reduce((groups: any, user: any) => {
      const org = user.organizacaoMilitar.nomeInstituicao;

      if (!groups[org]) {
        groups[org] = [];
      }

      groups[org].push(user);

      return groups;
    }, {});
  }

  // Método para excluir um usuário
  deleteUser(userId: string): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.dataService.deleteUser(userId).subscribe(() => {
        this.snackBar.open('Usuário excluído com sucesso', 'Fechar', { duration: 3000 });
        this.loadUsers(); // Recarregar a lista de usuários após exclusão
      }, (error) => {
        this.snackBar.open('Erro ao excluir o usuário', 'Fechar', { duration: 3000 });
      });
    }
  }

  editUser(userId: any): void {
    const dialogRef = this.dialog.open(UsuarioEditModalComponent, {
      data: { userId }
    });
    console.log(userId)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Salvar os dados do usuário
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
    //   this.authService.registerUser(this.userForm.value).subscribe(
    //     response => {
    //       console.log('Usuário cadastrado com sucesso!', response);
    //     },
    //     error => {
    //       console.error('Erro ao cadastrar usuário', error);
    //     }
    //   );
    console.log('entrei')
    } else {
      console.log('nao entrou')
    }
  }

  getOrganizations(): string[] {
    return Object.keys(this.groupedUsers);
  }
}
