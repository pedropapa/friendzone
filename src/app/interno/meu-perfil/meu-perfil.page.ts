import {Component} from '@angular/core';
import {AlertController, LoadingController, Platform, ToastController} from '@ionic/angular';
import {ParseService} from '../../services/parse.service';
import {forkJoin, Observable} from 'rxjs';
import {DepoimentoInterface, PerguntaInterface, UsuarioAdjetivoInterface} from '../../interfaces/app.interface';

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
    public loading: LoadingController,
    public toast: ToastController,
    public alert: AlertController,
  ) {
    this.buscarDados();
  }

  public buscarDados(refresher?: any) {
    this.multi = [];
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

  async esconderDepoimento(dadosDepoimento: DepoimentoInterface) {
    const loading = await this.loading.create();
    loading.present();

    try {
      const depoimento = await this.parse.depoimento(dadosDepoimento).toPromise();

      depoimento.set('escondido', true);
      await depoimento.save();

      dadosDepoimento.escondido = true;

      const toast = await this.toast.create({
        message: 'O depoimento foi escondido!',
        duration: 3000,
      });

      toast.present();

      loading.dismiss();
    } catch (err) {
      console.error(err);

      const alert = await this.alert.create({
        header: 'Oops!',
        message: 'Um erro ocorreu ao esconder o depoimento!',
      });

      alert.present();

      loading.dismiss();
    }
  }

  async mostrarDepoimento(dadosDepoimento: DepoimentoInterface) {
    const loading = await this.loading.create();
    loading.present();

    try {
      const depoimento = await this.parse.depoimento(dadosDepoimento).toPromise();

      depoimento.set('escondido', false);
      await depoimento.save();

      dadosDepoimento.escondido = false;

      const toast = await this.toast.create({
        message: 'O depoimento foi mostrado!',
        duration: 3000,
      });

      toast.present();

      loading.dismiss();
    } catch (err) {
      console.error(err);

      const alert = await this.alert.create({
        header: 'Oops!',
        message: 'Um erro ocorreu ao esconder o depoimento!',
      });

      alert.present();

      loading.dismiss();
    }
  }

  async ignorarPergunta(dadosPergunta: PerguntaInterface) {
    const loading = await this.loading.create();
    loading.present();

    try {
      const pergunta = await this.parse.pergunta(dadosPergunta).toPromise();

      pergunta.set('escondido', true);
      await pergunta.save();

      dadosPergunta.escondido = true;

      const toast = await this.toast.create({
        message: 'O pergunta foi ignorada!',
        duration: 3000,
      });

      toast.present();

      loading.dismiss();
    } catch (err) {
      console.error(err);

      const alert = await this.alert.create({
        header: 'Oops!',
        message: 'Um erro ocorreu ao ignorar a pergunta!',
      });

      alert.present();

      loading.dismiss();
    }
  }

  async alertaPerguntaIgnorada() {
    const alert = await this.alert.create({
      header: 'Oops!',
      message: 'Esta pergunta está ignorada, não é possível modificá-la.',
    });

    alert.present();
  }
}
