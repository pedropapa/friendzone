import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Facebook} from '@ionic-native/facebook/ngx';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    private fb: Facebook,
    public auth: AuthService,
    public alert: AlertController,
  ) {
  }

  ngOnInit() {
  }

  async entrar() {
    const modalCarregando = await this.modalCtrl.create({
      component: 'CarregarDadosPage',
      // enterAnimation: FadeTransition,
      // leaveAnimation: FadeTransition,
    });

    modalCarregando.present();

    try {
      const dadosLogin = await this.fb.login([
        'public_profile', 'user_friends', 'email'
      ]);

      this.auth.facebookAuthData = dadosLogin.authResponse;

      modalCarregando.dismiss();
    } catch (err) {
      console.error(err);

      const alerta = await this.alert.create({
        header: 'Oops!',
        message: 'Um erro ocorreu ao autenticar no facebook'
      });

      alerta.present();

      modalCarregando.dismiss();
    }
  }
}
