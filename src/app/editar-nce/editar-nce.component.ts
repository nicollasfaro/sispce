import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NceService } from '../nce.service';

@Component({
  selector: 'app-editar-nce',
  templateUrl: './editar-nce.component.html',
  styleUrl: './editar-nce.component.css'
})
export class EditarNceComponent {
  nceDetails: any;

  constructor(
    private route: ActivatedRoute,
    private nceService: NceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const nceId = this.route.snapshot.paramMap.get('id') || '';
    this.loadNceDetails(nceId);
  }

  loadNceDetails(id: string): void {
    this.nceService.getNceById(id).subscribe((data) => {
      this.nceDetails = data;
    });
  }

  updateNce(): void {
    this.nceService.updateNce(this.nceDetails).subscribe(() => {
      this.router.navigate(['/nce', this.nceDetails.nceId]); // Redireciona de volta para visualização
    });
  }
  // Função para cancelar e voltar para a página de visualização sem salvar
  cancelEdit(): void {
    this.router.navigate(['/nce', this.nceDetails.nceId]); // Redireciona para a página de visualização
  }
}
