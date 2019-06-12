import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ImportarDadosService} from '../../services/importar-dados.service';
import {FriendsList} from '../../interfaces/facebook.interface';
import {Observable} from 'rxjs';
import {AdjetivoInterface} from '../../interfaces/app.interface';
import {ParseService} from '../../services/parse.service';
import {AlertController, IonSlides, LoadingController} from '@ionic/angular';
import {map} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.page.html',
  styleUrls: ['./avaliar.page.scss'],
})
export class AvaliarPage implements AfterViewInit {
  @ViewChild('slides') slides: IonSlides;

  public amigos: FriendsList;
  public adjetivos$: Observable<Array<AdjetivoInterface>>;
  public mostrarSelecaoAdjetivos = false;

  constructor(
    public importarDados: ImportarDadosService,
    public parse: ParseService,
    public loading: LoadingController,
    public alert: AlertController,
    public auth: AuthService,
  ) {
    this.amigos = this.importarDados.listaAmigos;
  }

  ngAfterViewInit(): void {
    this.carregarAdjetivos();
  }

  async carregarAdjetivos() {
    const sliderIndex = await this.slides.getActiveIndex();

    const amigo = this.amigos.data[sliderIndex];

    const amigoAdjetivos = await this.parse.adjetivos(amigo.id, this.auth.facebookUserData.id);

    this.adjetivos$ = this.parse.todosAdjetivos().pipe(
      map(adjetivos => adjetivos.filter(adjetivo =>
        !amigoAdjetivos.find(amigoAdjetivo => amigoAdjetivo.adjetivo === adjetivo.nome)))
    );
  }

  toggleSelecaoAdjetivos() {
    this.carregarAdjetivos();
    this.mostrarSelecaoAdjetivos = !this.mostrarSelecaoAdjetivos;
  }

  async atribuirAdjetivo(adjetivo: AdjetivoInterface) {
    const sliderIndex = await this.slides.getActiveIndex();

    const amigo = this.amigos.data[sliderIndex];

    const loading = await this.loading.create();
    loading.present();

    try {
      await this.parse.atribuirAdjetivo(adjetivo, amigo);

      this.carregarAdjetivos();

      loading.dismiss();
    } catch (err) {
      console.error(err);

      const alert = await this.alert.create({
        header: 'Oops!',
        message: err || 'Um erro ocorreu ao atribuir o adjetivo!',
      });

      alert.present();

      loading.dismiss();
    }
  }
}
