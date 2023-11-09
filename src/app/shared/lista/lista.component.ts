import { Component, Input, OnInit } from '@angular/core';
import { IService } from 'src/app/core/interface/iservice';
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
  @Input() service!: IService;
  data: any[] = [];
  page: number = 1;
  finalPage: number = 1;

  columnsToDisplay: String[] = [];

  ngOnInit(): void {
    // Mapping realizado no OnInit pois não é possível realizá-lo diretamente no destino (HTML)
    this.columnsToDisplay = this.displayedColumns.map((column) => (column).id);
    this.listar(1);
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
    if (scrollLocation > limit && this.page < this.finalPage) {
      this.page++;
      this.listar(this.page);
    }
  }

  /*
    Resgate dos dados da API para consumo da tabela, utilizando a service passada pelo 
    input do componente.
  */

  listar (page: number) {
    this.service.listar(page).subscribe(
      data => {
        this.data = this.data.concat(data.results);
        this.finalPage = data.info.pages;
      }
    ); 
  }

}
