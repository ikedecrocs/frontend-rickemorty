import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IService } from '../interface/iservice';

/**
 * Service para recuperação de dados de episódios.
 *
 * @export
 * @class EpisodiosService
 * @typedef {EpisodiosService}
 * @implements {IService}
 */
@Injectable({
  providedIn: 'root'
})
export class EpisodiosService implements IService{

  /**
   * URL da api no enviroment atual.
   *
   * @type {string}
   */
  apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Método para listagem genérica de episódios.
   *
   * @param {number} page Pagina a ser consumida.
   * @param {?String} [filtro] Filtro a ser utilizado no consumo da API.
   * @returns {Observable<any>} Observable com o resultado da pesquisa.
   */
  listar (page: number, filtro?: String): Observable<any> {
    if (filtro) {
      return this.httpClient.get<any[]>(`${this.apiUrl}/episode/?page=${page}&name=${filtro}`);
    } else {
      return this.httpClient.get<any[]>(`${this.apiUrl}/episode/?page=${page}`);
    }
  }

  /**
   * Método para recuperar informações de um único episódio utilizando o ID.
   *
   * @param {number} id ID do dado que será recuperado.
   * @returns {Observable<any>} Observable com o resultado da pesquisa.
   */
  listarUnico (id: number): Observable<any> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/episode/${id}`);
  }

  /**
   * Método para recuperar informações de um único episódio utilizando a URL da API.
   *
   * @param {string} url URL que será consumida.
   * @returns {Observable<any>} Observable com o resultado da pesquisa.
   */
  listarUnicoPorUrl (url: string): Observable<any> {
    return this.httpClient.get<any[]>(url);
  }
  
}
