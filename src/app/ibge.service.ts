import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  private apiUrlEstados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  constructor(private http: HttpClient) { }

  // Busca todos os estados (UF)
  getEstados(): Observable<any> {
    return this.http.get<any>(this.apiUrlEstados);
  }

  // Busca os municípios de um estado
  getMunicipios(ufId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlEstados}/${ufId}/municipios`);
  }
}
