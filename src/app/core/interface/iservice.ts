import { Observable } from "rxjs";

export interface IService {
    listar: (page: number) => Observable<any>
}
