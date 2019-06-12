import {AfterViewInit, Component} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {AlertController, LoadingController, ModalController, NavParams, Platform} from '@ionic/angular';
import {ParseService} from '../../services/parse.service';
import {ImportarDadosService} from '../../services/importar-dados.service';
import {UsuarioAdjetivoInterface} from '../../interfaces/app.interface';
import {FacebookUser} from '../../interfaces/facebook.interface';

@Component({
  selector: 'app-perfil-amigo',
  templateUrl: './perfil-amigo.page.html',
  styleUrls: ['./perfil-amigo.page.scss'],
})
export class PerfilAmigoPage implements AfterViewInit {
  public amigo: FacebookUser;

  view: any[] = [this.platform.width() * 0.9, this.platform.width() * 0.6];

  // options
  gradient = false;
  showLegend = false;

  multi: any[] = [];

  public requisicoes$: Observable<any>;

  constructor(
    public platform: Platform,
    public parse: ParseService,
    public loading: LoadingController,
    public navParams: NavParams,
    public viewCtrl: ModalController,
    public importarDados: ImportarDadosService,
    public alert: AlertController,
  ) {
    this.amigo = this.navParams.get('amigo');

    this.buscarDados();
  }

  ngAfterViewInit() {
    this.importarDados.esconderCarregamento();
  }

  fechar() {
    this.viewCtrl.dismiss();
  }

  public buscarDados(refresher?: any) {
    this.multi = [];
    this.requisicoes$ = forkJoin(
      this.parse.depoimentos(this.amigo.id, false),
      this.parse.perguntas(this.amigo.id, false),
      this.parse.adjetivos(this.amigo.id),
    );

    this.requisicoes$.subscribe(resultado => {
      if (refresher) {
        refresher.target.complete();
      }

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
