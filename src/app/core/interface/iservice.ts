import { Observable } from "rxjs";

// Interface para as services utilizadas na aplicação

export interface IService {
    listar: (page: number, filtro?: String) => Observable<any>
    listarUnico: (id: number) => Observable<any>
    listarUnicoPorUrl: (url: string) => Observable<any>
}
