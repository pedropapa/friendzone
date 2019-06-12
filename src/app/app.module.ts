import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {Facebook} from '@ionic-native/facebook/ngx';
import {AuthService} from './services/auth.service';
import {ImportarDadosService} from './services/importar-dados.service';
import {CarregarDadosPage} from './carregar-dados/carregar-dados.page';
import {FazerDepoimentoPage} from './fazer-depoimento/fazer-depoimento.page';
import {FazerPerguntaPage} from './fazer-pergunta/fazer-pergunta.page';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CarregarDadosPage,
    FazerDepoimentoPage,
    FazerPerguntaPage
  ],
  entryComponents: [
    CarregarDadosPage,
    FazerDepoimentoPage,
    FazerPerguntaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    Facebook,
    AuthService,
    ImportarDadosService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
