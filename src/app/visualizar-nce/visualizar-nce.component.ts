import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NceService } from '../nce.service';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-visualizar-nce',
  templateUrl: './visualizar-nce.component.html',
  styleUrl: './visualizar-nce.component.css'
})
export class VisualizarNceComponent {
  nceId!: string;
  nceDetails: any;
  candidatoDetails: any [] = []; // Você pode definir o tipo correto de acordo com seus dados
  candidatoId!: number;
  userRoles: string[] =[];

  constructor(private route: ActivatedRoute, private nceService: NceService, private router: Router, private dataService: DataService, private authService: AuthService) {}

  ngOnInit(): void {
    this.nceId = this.route.snapshot.paramMap.get('id') || '';
    this.loadNceDetails(this.nceId);
    this.loadCandidatoParaNce();
    this.authService.getUserRoles().subscribe(roles => {
      this.userRoles = roles;
      console.log('Roles atualizadas no header:', this.userRoles);
    }); // Verifique se o método está correto
  }

  loadNceDetails(nceId: string) {
    
    this.nceService.getNceById(nceId).subscribe(
      (data) => {
        this.nceDetails = data;
        console.log(data)
      },
      (error) => {
        console.error('Erro ao buscar detalhes da NCE', error);
      }
    );
    
  }
  loadCandidatoParaNce(){
    this.dataService.getCandidatosParaNce().subscribe((data: any[] =[]) => {
      this.candidatoDetails = data.filter(a => a.nceId == this.nceId);
      console.log(data.filter(a => a.nceId == this.nceId))
    });
  }


  confirmDelete(id: number): void {
    const confirmation = window.confirm('Você tem certeza que deseja deletar este Candidato?');
    console.log(id)
    if (confirmation) {
      this.deleteCandidato(id);
    }
  }
  deleteCandidato(id: number): void {
    this.dataService.deleteCandidato(id).subscribe(() => {
      this.candidatoDetails = this.candidatoDetails.filter(c => c.nceId == this.nceId);
    });
    window.location.reload();
    setTimeout(function(){location.reload()}, 5000);
  }

  // Método para voltar à página anterior
  goBack() {
    this.router.navigate(['/listaNce']);
  }
  // Função para redirecionar para a página de edição
  editNce(id: string): void {
    this.router.navigate(['/nce/edit', id]); // Redireciona para a página de edição com o ID
  }
}
