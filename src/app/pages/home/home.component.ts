import { Component, OnInit } from '@angular/core';
import { TableHeader } from 'src/app/core/model/table-header.model';
import { EpisodiosService } from 'src/app/core/services/episodios.service';
import { LocaisService } from 'src/app/core/services/locais.service';
import { PersonagensService } from 'src/app/core/services/personagens.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  personagens!: any[];
  personagensColumns: TableHeader[] = [
    { id: "id", display: "ID" },
    { id: "name", display: "Nome" },
    { id: "status", display: "Status" },
    { id: "species", display: "Espécie" },
    { id: "gender", display: "Genêro" },
  ];

  locais!: any[];
  locaisColumns: TableHeader[] = [
    { id: "id", display: "ID" },
    { id: "name", display: "Nome" },
    { id: "type", display: "Tipo" },
    { id: "dimension", display: "Dimensão" },
  ];

  episodios!: any[];
  episodiosColumns: TableHeader[] = [
    { id: "id", display: "ID" },
    { id: "name", display: "Nome" },
    { id: "air_date", display: "Data de lançamento" },
    { id: "episode", display: "Espisódio" },
  ];

  constructor(
    private personagensService: PersonagensService,
    private locaisService: LocaisService,
    private episodiosService: EpisodiosService,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos () {
    this.listarPersonagens();
    this.listarLocais();
    this.listarEpisodios();
  }

  listarPersonagens () {
    this.personagensService.listar().subscribe(
      data => {
        this.personagens = data.results;
      }
    )
  }

  listarLocais () {
    this.locaisService.listar().subscribe(
      data => {
        this.locais = data.results;
      }
    )
  }

  listarEpisodios () {
    this.episodiosService.listar().subscribe(
      data => {
        this.episodios = data.results;
      }
    )
  }

}
