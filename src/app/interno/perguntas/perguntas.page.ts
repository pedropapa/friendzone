import {Component} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {AlertController, LoadingController, Platform, ToastController} from '@ionic/angular';
import {ParseService} from '../../services/parse.service';
import {PerguntaInterface} from '../../interfaces/app.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.page.html',
  styleUrls: ['./perguntas.page.scss'],
})
export class PerguntasPage {
  public requisicoes$: Observable<any>;

  public respostaHabilitada: Array<string> = [];

  public formGroup = new FormGroup({
    resposta: new FormControl('', {
      validators: [
        Validators.required,
      ]
    }),
  });

  constructor(
    public platform: Platform,
    public parse: ParseService,
    public loading: LoadingController,
    public toast: ToastController,
    public alert: AlertController,
    public auth: AuthService,
  ) {
    this.buscarDados();
  }

  public buscarDados(refresher?: any) {
    this.requisicoes$ = forkJoin(
      this.parse.perguntas(this.auth.facebookUserData.id, false),
    );

    this.requisicoes$.subscribe(() => {
      if (refresher) {
        refresher.target.complete();
      }
    });
  }

  habilitarResposta(pergunta: PerguntaInterface) {
    this.respostaHabilitada[pergunta.objectId] = true;
  }

  desabilitarResposta(pergunta: PerguntaInterface) {
    this.respostaHabilitada[pergunta.objectId] = false;
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

      this.buscarDados();

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

  async enviarResposta(dadosPergunta: PerguntaInterface) {
    const loading = await this.loading.create();
    loading.present();

    try {
      await this.parse.responderPergunta(dadosPergunta, this.formGroup.controls.resposta.value);

      dadosPergunta.resposta = this.formGroup.controls.resposta.value;

      const toast = await this.toast.create({
        message: 'O pergunta foi respondida!',
        duration: 3000,
      });

      toast.present();

      this.desabilitarResposta(dadosPergunta);

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

}
