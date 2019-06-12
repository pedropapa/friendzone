import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {InternoPage} from './interno.page';

const routes: Routes = [
  {
    path: '',
    component: InternoPage,
    children: [
      {path: 'meu-perfil', loadChildren: './meu-perfil/meu-perfil.module#MeuPerfilPageModule'},
      {path: 'avaliacoes', loadChildren: './avaliacoes/avaliacoes.module#AvaliacoesPageModule'},
      {path: 'depoimentos', loadChildren: './depoimentos/depoimentos.module#DepoimentosPageModule'},
      {path: 'perguntas', loadChildren: './perguntas/perguntas.module#PerguntasPageModule'},
      {path: 'avaliar', loadChildren: './avaliar/avaliar.module#AvaliarPageModule'},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InternoPage]
})
export class InternoPageModule {
}
