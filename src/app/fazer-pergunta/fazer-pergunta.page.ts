import {Component, OnInit} from '@angular/core';
import {FacebookUser} from '../interfaces/facebook.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {ParseService} from '../services/parse.service';

@Component({
  selector: 'app-fazer-pergunta',
  templateUrl: './fazer-pergunta.page.html',
  styleUrls: ['./fazer-pergunta.page.scss'],
})
export class FazerPerguntaPage implements OnInit {

  public amigo: FacebookUser;

  public formGroup = new FormGroup({
    titulo: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(128),
      ]
    }),
  });

  constructor(public viewCtrl: ModalController,
              public navParams: NavParams,
              public loading: LoadingController,
              public toast: ToastController,
              public parse: ParseService,
              public alert: AlertController) {
  }

  ngOnInit() {
    this.amigo = this.navParams.get('amigo');
  }

  fechar() {
    this.viewCtrl.dismiss();
  }

  public async confirmar() {
    const alert = await this.alert.create({
      header: 'Pergunta',
      message: 'Deseja realmente fazer a pergunta?',
      buttons: [
        {
          text: 'Continuar',
          handler: async () => {
            this.enviar();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {

          }
        }
      ]
    });

    alert.present();
  }

  private async enviar() {
    const loading = await this.loading.create();
    loading.present();

    try {
      await this.parse.criarPergunta(this.formGroup.controls.titulo.value, this.amigo);

      const toast = await this.toast.create({
        message: 'Pergunta feita! Aguarde seu amigo responder =)',
        duration: 3000,
      });

      toast.present();

      loading.dismiss();

      this.fechar();
    } catch (err) {
      console.error(err);

      const alert = await this.alert.create({
        header: 'Oops!',
        message: 'Um erro ocorreu ao fazer a pergunta!',
      });

      alert.present();

      loading.dismiss();
    }
  }
}
