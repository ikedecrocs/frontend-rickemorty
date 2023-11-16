import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IService } from '../interface/iservice';

@Injectable({
  providedIn: 'root'
})
export class PersonagensService implements IService {

  /*
    Service para recuperação de dados de personagens.

    apiUrl: url da api no enviroment atual.
  */

  apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  /* 
    Método para listagem genérica de personagens.

    page: página que será consumida.
    filtro: filtro que será utilizado na pesquisa, caso exista.
  */

  listar (page: number, filtro?: String): Observable<any> {
    if (filtro) {
      return this.httpClient.get<any[]>(`${this.apiUrl}/character/?page=${page}&name=${filtro}`);
    } else {
      return this.httpClient.get<any[]>(`${this.apiUrl}/character/?page=${page}`);
    }
  }

  /* 
    Método para recuperar informações de um único personagem utilizando o ID.

    id: id do dado que será recuperado.
  */

  listarUnico (id: number): Observable<any> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/character/${id}`);
  }

  /*
    Método para recuperar informações de um único personagem utilizando a URL da API.

    url: URL que será consumida.
  */

  listarUnicoPorUrl (url: string): Observable<any> {
    return this.httpClient.get<any[]>(url);
  }

}
