import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TableHeader } from 'src/app/core/model/table-header.model';

/**
 * Componente para listagem.
 *
 * @export
 * @class ListaComponent
 * @typedef {ListaComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  /**
   * Array de TableHeader, seriam as colunas da tabela, sendo que id é o valor que que puxará os valores da API e display que será o valor que será mostrado no header da coluna.
   *
   * @type {!TableHeader[]}
   */
  @Input() displayedColumns!: TableHeader[];

  /**
   * Seria o tipo do dado que a lista está exibindo, sendo eles: 0 = personagem, 1 = local, 2 = episódio.
   *
   * @type {!number}
   */
  @Input() tipoDado!: number;

  /**
   * Dados que serão exibidos na tabela.
   *
   * @type {!any[]}
   */
  @Input() data!: any[];

  /**
   * EventEmitter que será disparado ao componente pai quando a tabela chegar no fim de seu scroll.
   *
   * @type {*}
   */
  @Output() scrollFimPagina = new EventEmitter();

  /**
   * Mapeamento das colunas para utilização no HTML
   *
   * @type {String[]}
   */
  columnsToDisplay: String[] = [];

  constructor (
    private router: Router
  ) {}

  ngOnInit(): void {
    // Mapping realizado no OnInit pois não é possível realizá-lo diretamente no destino (HTML)
    this.columnsToDisplay = this.displayedColumns.map((column) => (column).id);
  }

  /**
   * Método acionado em todo scroll até o final da tabela, carregando a próxima página caso
   * a visualização esteja no final da tabela e a página atual não seja a última. Possibilita o
   * scroll infinito.
   *
   * @param {*} e
   */
  onTableScroll(e: any) {
    const tableViewHeight = e.target.offsetHeight;
    const tableScrollHeight = e.target.scrollHeight;
    const scrollLocation = e.target.scrollTop;
    
    // Buffer de 200px para o scroll até o final da página
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      this.scrollFimPagina.emit(this.tipoDado);
    }
  }

  /**
   * Resgate dos dados da API para consumo da tabela, utilizando a service passada pelo 
   * input do componente.
   *
   * @param {number} id ID do dado que fora clicado.
   */
  abrirDetalhes(id: number) {
    this.router.navigate([`detalhes/${this.tipoDado}/${id}`]);
  }

}
