import {Injectable} from '@angular/core';
import {CarregarDadosPage} from '../carregar-dados/carregar-dados.page';
import {ModalController, Platform} from '@ionic/angular';
import {FriendsList} from '../interfaces/facebook.interface';

@Injectable({
  providedIn: 'root',
})
export class ImportarDadosService {
  public modalCarregamento: HTMLIonModalElement;
  public listaAmigos: FriendsList;

  constructor(
    public modalCtrl: ModalController,
    public platform: Platform
  ) {
    if (!platform.is('cordova')) {
      this.listaAmigos = {
        'data': [{
          'name': 'Gabii Carvalho',
          'id': '2898975973452979',
          'picture': {
            'data': {
              'height': 200,
              'is_silhouette': false,
              'url': 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2898975973452979&height=200&width=200&ext=1562941992&hash=AeRTsTtAAQltuA20',
              'width': 200
            }
          }
        },{
          'name': 'Leandro Papadópolis',
          'id': '2898975973452978',
          'picture': {
            'data': {
              'height': 200,
              'is_silhouette': false,
              'url': 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2898975973452979&height=200&width=200&ext=1562941992&hash=AeRTsTtAAQltuA20',
              'width': 200
            }
          }
        }],
        'paging': {
          'cursors': {
            'before': 'QVFIUnFIeWxFMUxvUHNuTHJVbmtHZAnp5cGk5WnBMWFdQV1NQUUtrT3ZAab0Njc24zczd2dm1WNnhQalJGZA3RxcDdqVXZAOUWc0alY0cEd2eFNoclJKMFVRdDR3',
            'after': 'QVFIUnFIeWxFMUxvUHNuTHJVbmtHZAnp5cGk5WnBMWFdQV1NQUUtrT3ZAab0Njc24zczd2dm1WNnhQalJGZA3RxcDdqVXZAOUWc0alY0cEd2eFNoclJKMFVRdDR3'
          }
        },
        'summary': {'total_count': 398}
      };
    }
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
