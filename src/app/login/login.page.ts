import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
  ) {
  }

  ngOnInit() {
  }

  entrar() {
    this.modalCtrl.create({
      component: 'CarregarDadosPage',
      // enterAnimation: FadeTransition,
      // leaveAnimation: FadeTransition,
    });
  }
}
