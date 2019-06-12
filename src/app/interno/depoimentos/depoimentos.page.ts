import {Component} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {AlertController, LoadingController, Platform, ToastController} from '@ionic/angular';
import {ParseService} from '../../services/parse.service';
import {DepoimentoInterface} from '../../interfaces/app.interface';

@Component({
  selector: 'app-depoimentos',
  templateUrl: './depoimentos.page.html',
  styleUrls: ['./depoimentos.page.scss'],
})
export class DepoimentosPage {
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
    this.requisicoes$ = forkJoin(
      this.parse.depoimentos('12313', true),
    );

    this.requisicoes$.subscribe(() => {
      if (refresher) {
        refresher.target.complete();
      }
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
}
