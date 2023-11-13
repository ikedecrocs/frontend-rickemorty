import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TableHeader } from 'src/app/core/model/table-header.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  /*
    Componente para listagem. Recebe as colunas que devem ser exibidas como "displayedColumns" e
    a service que irá resgatar os dados para o consumo da tabela como "service".
  */

  @Input() displayedColumns!: TableHeader[];
  @Input() tipoDado!: number;
  @Input() data!: any[];
  @Output() scrollFimPagina = new EventEmitter();

  columnsToDisplay: String[] = [];

  constructor (
    private router: Router
  ) {}

  ngOnInit(): void {
    // Mapping realizado no OnInit pois não é possível realizá-lo diretamente no destino (HTML)
    this.columnsToDisplay = this.displayedColumns.map((column) => (column).id);
    console.log(this.data);
  }

  /* 
    Método acionado em todo scroll até o final da tabela, carregando a próxima página caso
    a visualização esteja no final da tabela e a página atual não seja a última. Possibilita o
    scroll infinito.
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

  /*
    Resgate dos dados da API para consumo da tabela, utilizando a service passada pelo 
    input do componente.
  */

  abrirDetalhes(id: number) {
    console.log(`Abrindo nova página: detalhes/${this.tipoDado}/${id}`);
    this.router.navigate([`detalhes/${this.tipoDado}/${id}`]);
  }

}
