import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AvaliacoesPage} from './avaliacoes.page';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DirectivesModule} from '../../directives/directives.module';
import {ComponentsModule} from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: AvaliacoesPage
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
    ComponentsModule,
  ],
  declarations: [AvaliacoesPage]
})
export class AvaliacoesPageModule {
}
