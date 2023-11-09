import { Component } from '@angular/core';
import { TableHeader } from 'src/app/core/model/table-header.model';
import { EpisodiosService } from 'src/app/core/services/episodios.service';
import { LocaisService } from 'src/app/core/services/locais.service';
import { PersonagensService } from 'src/app/core/services/personagens.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Criando Array para preenchimento dos nomes das colunas e possibilitar o 
  // resgate dos dados dentro da lista

  personagensColumns: TableHeader[] = [
    { id: "id", display: "ID" },
    { id: "name", display: "Nome" },
    { id: "status", display: "Status" },
    { id: "species", display: "Espécie" },
    { id: "gender", display: "Genêro" },
  ];

  locaisColumns: TableHeader[] = [
    { id: "id", display: "ID" },
    { id: "name", display: "Nome" },
    { id: "type", display: "Tipo" },
    { id: "dimension", display: "Dimensão" },
  ];

  episodiosColumns: TableHeader[] = [
    { id: "id", display: "ID" },
    { id: "name", display: "Nome" },
    { id: "air_date", display: "Data de lançamento" },
    { id: "episode", display: "Espisódio" },
  ];

  // Injeção das services para envio ao componente

  constructor(
    public personagensService: PersonagensService,
    public locaisService: LocaisService,
    public episodiosService: EpisodiosService,
  ) { }

}