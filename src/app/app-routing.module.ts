import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'meu-perfil', loadChildren: './interno/meu-perfil/meu-perfil.module#MeuPerfilPageModule' },
  { path: 'tabs', loadChildren: './interno/tabs/tabs.module#TabsPageModule' },
  { path: 'avaliacoes', loadChildren: './interno/avaliacoes/avaliacoes.module#AvaliacoesPageModule' },
  { path: 'depoimentos', loadChildren: './interno/depoimentos/depoimentos.module#DepoimentosPageModule' },
  { path: 'perguntas', loadChildren: './interno/perguntas/perguntas.module#PerguntasPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
