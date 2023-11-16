import { Component, OnInit } from '@angular/core';
import { columnsDisplayCharacter, columnsDisplayEpisode, columnsDisplayLocation } from 'src/app/core/consts/columns-display';
import { TableHeader } from 'src/app/core/model/table-header.model';
import { EpisodiosService } from 'src/app/core/services/episodios.service';
import { LocaisService } from 'src/app/core/services/locais.service';
import { PersonagensService } from 'src/app/core/services/personagens.service';

/**
 * Componente para a página principal da aplicação.
 *
 * @export
 * @class HomeComponent
 * @typedef {HomeComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * Tab selecionado dentro da aplicação.
   *
   * @type {number}
   */
  selected: number = 0;

  /**
   * Array para a contagem da paginação das listas.
   *
   * @type {number[]}
   */
  page: number[] = [ 1, 1, 1 ];

  /**
   * Array para guardar a página final da lista na hora da paginação.
   *
   * @type {number[]}
   */
  finalPage: number[] = [ 0, 0, 0 ];

  /**
   * Dados que serão exibidos na lista de personagens.
   *
   * @type {any[]}
   */
  personagensDados: any[] = [];

  /**
   * Ids e Displays dos headers das colunas dentro da lista de personagens.
   *
   * @type {TableHeader[]}
   */
  personagensColumns: TableHeader[] = columnsDisplayCharacter;

  /**
   * Dados que serão exibidos na lista de locais.
   *
   * @type {any[]}
   */
  locaisDados: any[] = [];

  /**
   * Ids e Displays dos headers das colunas dentro da lista de locais.
   *
   * @type {TableHeader[]}
   */
  locaisColumns: TableHeader[] = columnsDisplayLocation;

  /**
   * Dados que serão exibidos na lista de episodios.
   *
   * @type {any[]}
   */
  episodiosDados: any[] = [];

  /**
   * Ids e Displays dos headers das colunas dentro da lista de episodios.
   *
   * @type {TableHeader[]}
   */
  episodiosColumns: TableHeader[] = columnsDisplayEpisode

  /**
   * String que receberá o valor do filtro para realizar a filtragem nos dados da lista.
   *
   * @type {String}
   */
  filtro: String = "";

  constructor(
    private personagensService: PersonagensService,
    private locaisService: LocaisService,
    private episodiosService: EpisodiosService,
  ) { }

  ngOnInit(): void {
    this.listar(0, 1);
    this.listar(1, 1);
    this.listar(2, 1);
  }

  /**
   * Método para consumir os dados da API e preencher os dados na aplicação.
   *
   * @param {number} tipoDado Number que receberá o tipo de dado que deve ser preenchido, sendo 0 = personagem, 1 = local, 2 = episodio
   * @param {number} page Number com a página atual da listagem
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

  /**
   * Método acionado quando o filtro é atualizado, limpando os dados atuais e consumindo os novos com a nova pesquisa.
   *
   * @param {*} e
   */
  applyFilter(e: any) {
    this.filtro = e.target.value;
    this.page = [ 1, 1, 1 ];
    this.personagensDados = [];
    this.locaisDados = [];
    this.episodiosDados = [];
    this.listar(this.selected, this.page[this.selected]);
  }

  /**
   * Método acionado quando a tab é atualizada. Quando o selected está numa lista, as outras não são carregadas
   *
   * @param {*} e
   */
  changeSelectedTab (e: any) {
    this.selected = e;
  }

  /**
   * Método acionado quando o componente de lista disparar um scroll. Carrega novos dados, caso hajam, e adicionam a lista.
   *
   * @param {number} tipoDado Number que receberá o tipo de dado que deve ser preenchido, sendo 0 = personagem, 1 = local, 2 = episodio
   */
  scroll(tipoDado: number) {
    console.log(`Scrollando (${tipoDado})...`)
    if (this.page[tipoDado] < this.finalPage[tipoDado]){
      this.page[tipoDado]++;
      this.listar(tipoDado, this.page[tipoDado]);
    }
  }

}