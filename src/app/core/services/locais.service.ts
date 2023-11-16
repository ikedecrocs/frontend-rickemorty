import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IService } from '../interface/iservice';

/**
 * Service para recuperação de dados de locais.
 * @date 11/16/2023 - 2:35:10 AM
 *
 * @export
 * @class LocaisService
 * @typedef {LocaisService}
 * @implements {IService}
 */
@Injectable({
  providedIn: 'root'
})
export class LocaisService implements IService {

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
   * Método para listagem genérica de locais.
   *
   * @param {number} page Pagina a ser consumida.
   * @param {?String} [filtro] Filtro a ser utilizado no consumo da API.
   * @returns {Observable<any>} Observable com o resultado da pesquisa.
   */
  listar (page: number, filtro?: String): Observable<any> {
    if (filtro) {
      return this.httpClient.get<any[]>(`${this.apiUrl}/location/?page=${page}&name=${filtro}`);
    } else {
      return this.httpClient.get<any[]>(`${this.apiUrl}/location/?page=${page}`);
    }
  }

  /**
   * Método para recuperar informações de um único local utilizando o ID.
   *
   * @param {number} id ID do dado que será recuperado.
   * @returns {Observable<any>} Observable com o resultado da pesquisa.
   */
  listarUnico (id: number): Observable<any> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/location/${id}`);
  }

  /**
   * Método para recuperar informações de um único local utilizando a URL da API.
   *
   * @param {string} url URL que será consumida.
   * @returns {Observable<any>} Observable com o resultado da pesquisa.
   */
  listarUnicoPorUrl (url: string): Observable<any> {
    return this.httpClient.get<any[]>(url);
  }
  
}
