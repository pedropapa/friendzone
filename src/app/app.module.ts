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

@NgModule({
  declarations: [
    AppComponent,
    CarregarDadosPage,
  ],
  entryComponents: [
    CarregarDadosPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
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
