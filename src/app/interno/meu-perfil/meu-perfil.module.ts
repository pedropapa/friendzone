import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MeuPerfilPage} from './meu-perfil.page';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DirectivesModule} from '../../directives/directives.module';

const routes: Routes = [
  {
    path: '',
    component: MeuPerfilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxChartsModule,
    DirectivesModule,
  ],
  declarations: [MeuPerfilPage]
})
export class MeuPerfilPageModule {
}
