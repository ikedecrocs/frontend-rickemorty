import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IService } from '../interface/iservice';

@Injectable({
  providedIn: 'root'
})
export class EpisodiosService implements IService{

  apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  listar (page: number, filtro?: String): Observable<any> {
    if (filtro) {
      return this.httpClient.get<any[]>(`${this.apiUrl}/episode/?page=${page}&name=${filtro}`);
    } else {
      return this.httpClient.get<any[]>(`${this.apiUrl}/episode/?page=${page}`);
    }
  }
  
}
