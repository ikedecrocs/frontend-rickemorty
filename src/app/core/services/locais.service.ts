import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IService } from '../interface/iservice';

@Injectable({
  providedIn: 'root'
})
export class LocaisService implements IService {

  /*
    Service para recuperação de dados de locais.

    apiUrl: url da api no enviroment atual.
  */

  apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  /* 
    Método para listagem genérica de locais.

    page: página que será consumida.
    filtro: filtro que será utilizado na pesquisa, caso exista.
  */

  listar (page: number, filtro?: String): Observable<any> {
    if (filtro) {
      return this.httpClient.get<any[]>(`${this.apiUrl}/location/?page=${page}&name=${filtro}`);
    } else {
      return this.httpClient.get<any[]>(`${this.apiUrl}/location/?page=${page}`);
    }
  }

  /* 
    Método para recuperar informações de um único local utilizando o ID.

    id: id do dado que será recuperado.
  */

  listarUnico (id: number): Observable<any> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/location/${id}`);
  }

  /*
    Método para recuperar informações de um único local utilizando a URL da API.

    url: URL que será consumida.
  */

  listarUnicoPorUrl (url: string): Observable<any> {
    return this.httpClient.get<any[]>(url);
  }
  
}
