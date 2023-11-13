import { Component, OnInit } from '@angular/core';
import { IService } from 'src/app/core/interface/iservice';
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

  selected: number = 0;

  // Criando Array para preenchimento dos nomes das colunas e possibilitar o 
  // resgate dos dados dentro da lista

  page: number[] = [ 1, 1, 1 ];
  finalPage: number[] = [ 0, 0, 0 ];
  personagensDados: any[] = [];
  personagensColumns: TableHeader[] = [
    { id: "id", display: "ID" },
    { id: "name", display: "Nome" },
    { id: "status", display: "Status" },
    { id: "species", display: "Espécie" },
    { id: "gender", display: "Genêro" },
  ];

  locaisDados: any[] = [];
  locaisColumns: TableHeader[] = [
    { id: "id", display: "ID" },
    { id: "name", display: "Nome" },
    { id: "type", display: "Tipo" },
    { id: "dimension", display: "Dimensão" },
  ];

  episodiosDados: any[] = [];
  episodiosColumns: TableHeader[] = [
    { id: "id", display: "ID" },
    { id: "name", display: "Nome" },
    { id: "air_date", display: "Data de lançamento" },
    { id: "episode", display: "Episódio" },
  ];

  // String para receber o filtro

  filtro: String = "";

  // Injeção das services para envio ao componente

  constructor(
    public personagensService: PersonagensService,
    public locaisService: LocaisService,
    public episodiosService: EpisodiosService,
  ) { }

  ngOnInit(): void {
    this.listar(0, 1);
    this.listar(1, 1);
    this.listar(2, 1);
  }

  listar (tipoDado: number, page: number) {
    console.log(`LISTANDO, TIPO: ${tipoDado}, PÁGINA: ${page}/${this.finalPage[tipoDado]}`)
    switch(tipoDado){
      case 0:
        if (this.filtro != "") {
          this.personagensService.listar(page, this.filtro).subscribe(
            data => {
              this.personagensDados = this.personagensDados.concat(data.results);
              this.finalPage[tipoDado] = data.info.pages;
            }
          );
        } else {
          this.personagensService.listar(page).subscribe(
            data => {
              this.personagensDados = this.personagensDados.concat(data.results);
              this.finalPage[tipoDado] = data.info.pages;
            }
          ); 
        }
        break;
      case 1:
        if (this.filtro != "") {
          this.locaisService.listar(page, this.filtro).subscribe(
            data => {
              this.locaisDados = this.locaisDados.concat(data.results);
              this.finalPage[tipoDado] = data.info.pages;
            }
          );
        } else {
          this.locaisService.listar(page).subscribe(
            data => {
              this.locaisDados = this.locaisDados.concat(data.results);
              this.finalPage[tipoDado] = data.info.pages;
            }
          ); 
        }
        break;
      case 2:
        if (this.filtro != "") {
          this.episodiosService.listar(page, this.filtro).subscribe(
            data => {
              this.episodiosDados = this.episodiosDados.concat(data.results);
              this.finalPage[tipoDado] = data.info.pages;
            }
          );
        } else {
          this.episodiosService.listar(page).subscribe(
            data => {
              this.episodiosDados = this.episodiosDados.concat(data.results);
              this.finalPage[tipoDado] = data.info.pages;
            }
          ); 
        }
        break;
    }
  }

  applyFilter(e: any) {
    this.filtro = e.target.value;
    this.page = [ 1, 1, 1 ];
    this.personagensDados = [];
    this.locaisDados = [];
    this.episodiosDados = [];
    this.listar(this.selected, this.page[this.selected]);
  }

  changeSelectedTab (e: any) {
    this.selected = e;
  }

  scroll(tipoDado: number) {
    console.log(`Scrollando (${tipoDado})...`)
    if (this.page[tipoDado] < this.finalPage[tipoDado]){
      this.page[tipoDado]++;
      this.listar(tipoDado, this.page[tipoDado]);
    }
  }

}