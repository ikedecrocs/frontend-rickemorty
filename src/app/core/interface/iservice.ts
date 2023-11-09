import { Observable } from "rxjs";

export interface IService {
    listar: (page: number, filtro?: String) => Observable<any>
}
