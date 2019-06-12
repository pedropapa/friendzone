import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {ParseService} from '../../services/parse.service';
import {forkJoin, Observable} from 'rxjs';
import {UsuarioAdjetivoInterface} from '../../interfaces/app.interface';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.page.html',
  styleUrls: ['./meu-perfil.page.scss'],
})
export class MeuPerfilPage {
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
  ) {
    this.buscarDados();
  }

  public buscarDados(refresher?: any) {
    this.requisicoes$ = forkJoin(
      this.parse.depoimentos('12313', true, 5),
      this.parse.perguntas('12313', true, 5),
      this.parse.adjetivos('12313'),
    );

    this.requisicoes$.subscribe(resultado => {
      if (refresher) {
        refresher.target.complete();
      }

      console.log('>>> ', resultado[2]);

      this.multi = (resultado[2] as Array<UsuarioAdjetivoInterface>).map(
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
