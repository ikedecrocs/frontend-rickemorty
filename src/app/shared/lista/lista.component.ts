import { Component, Input, OnInit } from '@angular/core';
import { TableHeader } from 'src/app/core/model/table-header.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  @Input() data!: any[];
  @Input() displayedColumns!: TableHeader[];

  columnsToDisplay: String[] = [];

  ngOnInit(): void {
    this.columnsToDisplay = this.displayedColumns.map((column) => (column).id)
  }

}
