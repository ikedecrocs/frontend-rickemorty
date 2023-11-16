import { Component, OnInit } from '@angular/core';
import { columnsDisplayCharacter, columnsDisplayEpisode, columnsDisplayLocation } from 'src/app/core/consts/columns-display';
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

  /*
    Componente para a página principal da aplicação.

    selected: Tab selecionado dentro da aplicação.
    page: array para a contagem da paginação das listas.
    finalPage: array para guardar a página final da lista na hora da paginação.
    personagendsDados: Dados que serão exibidos na lista de personagens.
    personagensColumns: Ids e Displays dos headers das colunas dentro da lista de personagens.
    locaisDados: Dados que serão exibidos na lista de locais.
    locaisColumns: Ids e Displays dos headers das colunas dentro da lista de locais.
    episodiosDados: Dados que serão exibidos na lista de episodios.
    episodiosColumns: Ids e Displays dos headers das colunas dentro da lista de episodios.
    filtro: String que receberá o valor do filtro para realizar a filtragem nos dados da lista.
  */

  selected: number = 0;

  page: number[] = [ 1, 1, 1 ];
  finalPage: number[] = [ 0, 0, 0 ];

  personagensDados: any[] = [];
  personagensColumns: TableHeader[] = columnsDisplayCharacter;

  locaisDados: any[] = [];
  locaisColumns: TableHeader[] = columnsDisplayLocation;

  episodiosDados: any[] = [];
  episodiosColumns: TableHeader[] = columnsDisplayEpisode

  filtro: String = "";

  // Injeção das services para envio ao componente

  constructor(
    public personagensService: PersonagensService,
    public locaisService: LocaisService,
    public episodiosService: EpisodiosService,
  ) { }

  // Carregando o início das listas ao iniciar o componente

  ngOnInit(): void {
    this.listar(0, 1);
    this.listar(1, 1);
    this.listar(2, 1);
  }

  /*
    Método para consumir os dados da API e preencher os dados na aplicação.

    tipoDado: number que receberá o tipo de dado que deve ser preenchido, sendo 0 = personagem, 1 = local, 2 = episodio
    page: number com a página atual da listagem
  */

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

  // Método acionado quando o filtro é atualizado, limpando os dados atuais e consumindo os novos com a nova pesquisa.

  applyFilter(e: any) {
    this.filtro = e.target.value;
    this.page = [ 1, 1, 1 ];
    this.personagensDados = [];
    this.locaisDados = [];
    this.episodiosDados = [];
    this.listar(this.selected, this.page[this.selected]);
  }

  // Método acionado quando a tab é atualizada. Quando o selected está numa lista, as outras não são carregadas

  changeSelectedTab (e: any) {
    this.selected = e;
  }

  // Método acionado quando o componente de lista disparar um scroll. Carrega novos dados, caso hajam, e adicionam a lista.

  scroll(tipoDado: number) {
    console.log(`Scrollando (${tipoDado})...`)
    if (this.page[tipoDado] < this.finalPage[tipoDado]){
      this.page[tipoDado]++;
      this.listar(tipoDado, this.page[tipoDado]);
    }
  }

}