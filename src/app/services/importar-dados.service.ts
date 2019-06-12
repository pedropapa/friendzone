import {Injectable} from '@angular/core';
import {CarregarDadosPage} from '../carregar-dados/carregar-dados.page';
import {ModalController} from '@ionic/angular';
import {FriendsList} from '../interfaces/facebook.interface';

@Injectable({
  providedIn: 'root',
})
export class ImportarDadosService {
  public modalCarregamento: HTMLIonModalElement;
  public listaAmigos: FriendsList;

  constructor(public modalCtrl: ModalController) {
  }

  public async mostrarCarregamento() {
    this.modalCarregamento = await this.modalCtrl.create({
      component: CarregarDadosPage,
    });

    return this.modalCarregamento.present();
  }

  public esconderCarregamento() {
    console.log(this.modalCarregamento);

    if (this.modalCarregamento) {
      return this.modalCarregamento.dismiss();
    }
  }
}