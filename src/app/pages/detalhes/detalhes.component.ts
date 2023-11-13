import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IService } from 'src/app/core/interface/iservice';
import { TableHeader } from 'src/app/core/model/table-header.model';
import { EpisodiosService } from 'src/app/core/services/episodios.service';
import { LocaisService } from 'src/app/core/services/locais.service';
import { PersonagensService } from 'src/app/core/services/personagens.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  tipoDado: number = 0;
  idDado: number = 0;
  services: IService[] = [];
  dado: any;
  listaSecundaria: any[] = [];
  carregado = false;

  episodiosColumns: TableHeader[] = [
    { id: "id", display: "ID" },
    { id: "name", display: "Nome" },
    { id: "air_date", display: "Data de lançamento" },
    { id: "episode", display: "Episódio" },
  ];

  personagensColumns: TableHeader[] = [
    { id: "id", display: "ID" },
    { id: "name", display: "Nome" },
    { id: "status", display: "Status" },
    { id: "species", display: "Espécie" },
    { id: "gender", display: "Genêro" },
  ];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public personagensService: PersonagensService,
    public locaisService: LocaisService,
    public episodiosService: EpisodiosService,
  ) {
    this.services[0] = this.personagensService;
    this.services[1] = this.locaisService;
    this.services[2] = this.episodiosService;
  }

  ngOnInit(): void {
    this.carregarInformacoes();
  }

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

  redirecionar(url: string, tipoDado: number) {
    this.services[tipoDado].listarUnicoPorUrl(url).subscribe(
      data => {
        this.router.navigate([`/detalhes/${tipoDado}/${data.id}`]);
      }
    )
  }

  recuperarLista() {
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
