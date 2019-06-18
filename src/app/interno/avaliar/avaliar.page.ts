import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ImportarDadosService} from '../../services/importar-dados.service';
import {FacebookUser, FriendsList} from '../../interfaces/facebook.interface';
import {Observable} from 'rxjs';
import {AdjetivoInterface} from '../../interfaces/app.interface';
import {ParseService} from '../../services/parse.service';
import {AlertController, IonSlides, LoadingController, ModalController} from '@ionic/angular';
import {map} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {FazerDepoimentoPage} from '../../fazer-depoimento/fazer-depoimento.page';
import {FazerPerguntaPage} from '../../fazer-pergunta/fazer-pergunta.page';
import {PerfilAmigoPage} from '../perfil-amigo/perfil-amigo.page';
import * as _ from 'underscore';

@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.page.html',
  styleUrls: ['./avaliar.page.scss'],
})
export class AvaliarPage implements AfterViewInit {
  @ViewChild('slides') slides: IonSlides;

  public amigos: FriendsList;
  public adjetivos$: Observable<Array<AdjetivoInterface>>;
  public adjetivos: Array<AdjetivoInterface>;
  public mostrarSelecaoAdjetivos = false;
  public adjetivosAtribuidos: Array<number> = [];
  public amigoSelecionado: FacebookUser;

  constructor(
    public importarDados: ImportarDadosService,
    public parse: ParseService,
    public loading: LoadingController,
    public alert: AlertController,
    public auth: AuthService,
    public modal: ModalController,
  ) {
    this.amigos = this.importarDados.listaAmigos;
  }

  ngAfterViewInit(): void {
    this.carregarAdjetivos();
  }

  async carregarAdjetivos() {
    const sliderIndex = await this.slides.getActiveIndex();

    const amigo = this.amigos.data[sliderIndex];

    this.amigoSelecionado = amigo;

    const amigoAdjetivos = await this.parse.adjetivos(amigo.id, this.auth.facebookUserData.id);

    this.adjetivos$ = this.parse.todosAdjetivos().pipe(
      map(adjetivos => adjetivos.filter(adjetivo =>
        !amigoAdjetivos.find(amigoAdjetivo => amigoAdjetivo.adjetivo === adjetivo.nome)))
    );

    this.adjetivos$.subscribe(adjetivos => this.adjetivos = adjetivos);
  }

  toggleSelecaoAdjetivos() {
    this.mostrarSelecaoAdjetivos = !this.mostrarSelecaoAdjetivos;
  }

  async atribuirAdjetivo(adjetivo: AdjetivoInterface) {
    const sliderIndex = await this.slides.getActiveIndex();

    const amigo = this.amigos.data[sliderIndex];

    const loading = await this.loading.create();
    loading.present();

    try {
      await this.parse.atribuirAdjetivo(adjetivo, amigo);

      const adjetivoAtribuido = this.adjetivosAtribuidos[amigo.id];

      if (!adjetivoAtribuido) {
        this.adjetivosAtribuidos[amigo.id] = [];
      }

      this.adjetivosAtribuidos[amigo.id][adjetivo.nome] = true;

      setTimeout(() => {
        this.adjetivos = _.without(this.adjetivos, adjetivo);
      }, 499);

      loading.dismiss();
    } catch (err) {
      console.error(err);

      const alert = await this.alert.create({
        header: 'Oops!',
        message: err || 'Um erro ocorreu ao atribuir o adjetivo!',
        buttons: [
          {
            text: 'Fechar',
          }
        ]
      });

      alert.present();

      loading.dismiss();
    }
  }

  async verPerfil(amigo: FacebookUser) {
    const modal = await this.modal.create({
      component: PerfilAmigoPage,
      componentProps: {
        amigo: amigo,
      }
    });

    modal.present();
  }

  async fazerDepoimento(amigo: FacebookUser) {
    const modal = await this.modal.create({
      component: FazerDepoimentoPage,
      componentProps: {
        amigo: amigo,
      }
    });

    modal.present();
  }

  async fazerPergunta(amigo: FacebookUser) {
    const modal = await this.modal.create({
      component: FazerPerguntaPage,
      componentProps: {
        amigo: amigo,
      }
    });

    modal.present();
  }
}
