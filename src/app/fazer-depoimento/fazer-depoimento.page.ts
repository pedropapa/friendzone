import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {FacebookUser} from '../interfaces/facebook.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ParseService} from '../services/parse.service';

@Component({
  selector: 'app-fazer-depoimento',
  templateUrl: './fazer-depoimento.page.html',
  styleUrls: ['./fazer-depoimento.page.scss'],
})
export class FazerDepoimentoPage implements OnInit {
  public amigo: FacebookUser;

  public formGroup = new FormGroup({
    titulo: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(64),
      ]
    }),
    descricao: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(1024),
        Validators.minLength(10),
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
    console.log('>>> confirmando');
    const alert = await this.alert.create({
      header: 'Depoimento',
      message: 'Deseja realmente enviar o depoimento?',
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
      await this.parse.criarDepoimento(this.formGroup.controls.titulo.value,
        this.formGroup.controls.descricao.value, this.amigo);

      const toast = await this.toast.create({
        message: 'Depoimento enviado!',
        duration: 3000,
      });

      toast.present();

      loading.dismiss();

      this.fechar();
    } catch (err) {
      console.error(err);

      const alert = await this.alert.create({
        header: 'Oops!',
        message: 'Um erro ocorreu ao enviar o depoimento!',
      });

      alert.present();

      loading.dismiss();
    }
  }
}
