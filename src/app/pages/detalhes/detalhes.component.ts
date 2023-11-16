import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { columnsDisplayCharacter, columnsDisplayEpisode } from 'src/app/core/consts/columns-display';
import { IService } from 'src/app/core/interface/iservice';
import { TableHeader } from 'src/app/core/model/table-header.model';
import { EpisodiosService } from 'src/app/core/services/episodios.service';
import { LocaisService } from 'src/app/core/services/locais.service';
import { PersonagensService } from 'src/app/core/services/personagens.service';

/**
 * Componente para mostrar os detalhes do dado recebido pela URL (/detalhes/:tipo/:id)
 *
 * @export
 * @class DetalhesComponent
 * @typedef {DetalhesComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  /**
   * Number, seria o tipo do dado que terá seus detalhes exibidos, sendo eles: 0 = personagem, 1 = local, 2 = episódio. Recebido pela URL (:tipo).
   *
   * @type {number}
   */
  tipoDado: number = 0;

  /**
   * Number, id do dado que terá seus detalhes exibidos. Recebido pela URL (:id).
   *
   * @type {number}
   */
  idDado: number = 0;

  /**
   * Array de IService que serão as services disponíveis dentro do componente.
   *
   * @type {IService[]}
   */
  services: IService[] = [];

  /**
   * Dado que será exibido.
   *
   * @type {*}
   */
  dado: any;
  
  /**
   * Dados que serão exibidos na lista dentro do dado exibido, podendo ser de personagens ou episódios.
   *
   * @type {any[]}
   */
  listaSecundaria: any[] = [];

  /**
   * Ids e Displays dos headers das colunas dentro da lista de episódios.
   *
   * @type {TableHeader[]}
   */
  episodiosColumns: TableHeader[] = columnsDisplayEpisode;

  /**
   * Ids e Displays dos headers das colunas dentro da lista de personagens.
   *
   * @type {TableHeader[]}
   */
  personagensColumns: TableHeader[] = columnsDisplayCharacter;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private personagensService: PersonagensService,
    private locaisService: LocaisService,
    private episodiosService: EpisodiosService,
  ) {
    this.services[0] = this.personagensService;
    this.services[1] = this.locaisService;
    this.services[2] = this.episodiosService;
  }

  ngOnInit(): void {
    this.carregarInformacoes();
  }

  /**
   * Método que irá carregar as informações do dado que será exibido na tela.
   */
  carregarInformacoes() {
    this.activatedRoute.params.subscribe(
      params => {
        this.tipoDado = Number(params['tipo']);
        this.idDado = Number(params['id']);
        this.services[this.tipoDado].listarUnico(this.idDado).subscribe(
          data => {
            this.dado = data;
            this.recuperarLista();
          }
        )
      }
    )
  }

  /**
   * Método para redirecionar para outras páginas de detalhes.
   *
   * @param {string} url String que receberá a URL que será acessada para carregar o novo dado.
   * @param {number} tipoDado Number com o tipo do dado que irá ser carregado na nova página.
   */
  redirecionar(url: string, tipoDado: number) {
    this.services[tipoDado].listarUnicoPorUrl(url).subscribe(
      data => {
        this.router.navigate([`/detalhes/${tipoDado}/${data.id}`]);
      }
    )
  }
  
  /**
   * Método para carregar a lista secundária do dado
   */
  recuperarLista() {
    this.listaSecundaria = [];
    switch(this.tipoDado) {
      case 0:
        for (let episodio of this.dado.episode) {
          this.services[this.tipoDado].listarUnicoPorUrl(episodio).subscribe(
            data => {
              this.listaSecundaria = this.listaSecundaria.concat(data);
            }
          )
        }
        break;
      case 1:
        for (let residente of this.dado.residents) {
          this.services[this.tipoDado].listarUnicoPorUrl(residente).subscribe(
            data => {
              this.listaSecundaria = this.listaSecundaria.concat(data);
            }
          )
        }
        break;
      case 2:
        for (let personagem of this.dado.characters) {
          this.services[this.tipoDado].listarUnicoPorUrl(personagem).subscribe(
            data => {
              this.listaSecundaria = this.listaSecundaria.concat(data);
            }
          )
        }
        break;
    }
  }

}
