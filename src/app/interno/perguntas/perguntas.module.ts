import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PerguntasPage} from './perguntas.page';
import {DirectivesModule} from '../../directives/directives.module';

const routes: Routes = [
  {
    path: '',
    component: PerguntasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    DirectivesModule,
  ],
  declarations: [PerguntasPage]
})
export class PerguntasPageModule {
}
