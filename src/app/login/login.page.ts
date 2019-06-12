import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {Facebook} from '@ionic-native/facebook/ngx';
import {AuthService} from '../services/auth.service';
import {ImportarDadosService} from '../services/importar-dados.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public importarDados: ImportarDadosService,
    private fb: Facebook,
    public navCtrl: NavController,
    public auth: AuthService,
    public alert: AlertController,
  ) {
  }

  async ngOnInit() {

  }

  async entrar() {
    await this.importarDados.mostrarCarregamento();

    try {
      const dadosLogin = await this.fb.login([
        'public_profile', 'user_friends', 'email'
      ]);

      this.auth.facebookAuthData = dadosLogin.authResponse;

      this.importarDados.listaAmigos = await this.fb.api(
        `/${this.auth.facebookAuthData.userID}/friends?fields=name,id,picture.type(large)`,
        ['user_friends']
      );

      console.log(this.importarDados.listaAmigos);

      this.navCtrl.navigateForward(['interno/meu-perfil']);
    } catch (err) {
      console.error(err);

      const alerta = await this.alert.create({
        header: 'Oops!',
        message: 'Um erro ocorreu ao autenticar no facebook'
      });

      alerta.present();
    }
  }
}
