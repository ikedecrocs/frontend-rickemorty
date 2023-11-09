import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IService } from '../interface/iservice';

@Injectable({
  providedIn: 'root'
})
export class PersonagensService implements IService {

  apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  listar (page: number): Observable<any> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/character/?page=${page}`);
  }

}
