import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'

}) export class NceService { 
    private baseUrl = 'http://10.1.99.13:8080/nces'; // URL da API para buscar NCEs

    constructor(private http: HttpClient, private authService: AuthService) {}
    
    // Método para buscar NCE pelo ID 
    
    getNceById(nceId: string): Observable<any> { 
      const token = localStorage.getItem('authToken');
      const headers = { Authorization: `Bearer ${token}` };
      return this.http.get<any[]>(`${this.baseUrl}/${nceId}`, { headers });
    } 

    // Atualizar uma NCE
  updateNce(nce: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${nce.id}`, nce);
  }

  // Busca o usuário logado
  getUser(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<any>('api/login', { headers });
  }

  // Busca as NCEs e filtra pela Organização Militar do usuário logado
  getNcesByOrganizacaoMilitar(): Observable<any[]> {
    return this.getUser().pipe(
      map(user => user.organizacaoMilitar),  // Obtém a organização militar do usuário
      switchMap(organizacaoMilitar => {
        return this.http.get<any[]>(this.baseUrl).pipe(
          map(nces => nces.filter(nce => nce.organizacaoMilitarResponsavel.nomeInstituicao === organizacaoMilitar)) // Filtra as NCEs
        );
      })
    );
  }

}