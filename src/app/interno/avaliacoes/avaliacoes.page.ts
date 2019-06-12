import { Component, OnInit } from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {Platform} from '@ionic/angular';
import {UsuarioAdjetivoInterface} from '../../interfaces/app.interface';
import {ParseService} from '../../services/parse.service';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.page.html',
  styleUrls: ['./avaliacoes.page.scss'],
})
export class AvaliacoesPage implements OnInit {
  view: any[] = [this.platform.width() * 0.9, this.platform.width() * 0.6];

  // options
  gradient = false;
  showLegend = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  multi: any[] = [];

  public requisicoes$: Observable<any>;

  constructor(
    public platform: Platform,
    public parse: ParseService,
  ) { }

  ngOnInit() {
    this.buscarDados();
  }

  public buscarDados(refresher?: any) {
    this.multi = [];
    this.requisicoes$ = forkJoin(
      this.parse.adjetivos('12313'),
    );

    this.requisicoes$.subscribe(resultado => {
      if (refresher) {
        refresher.target.complete();
      }

      this.multi = (resultado[0] as Array<UsuarioAdjetivoInterface>).map(
        adjetivo => {
          return {
            name: adjetivo.adjetivo,
            value: adjetivo.quantidade,
          };
        }
      );
    });
  }

}
