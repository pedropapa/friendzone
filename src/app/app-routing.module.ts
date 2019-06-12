import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'interno', loadChildren: './interno/interno.module#InternoPageModule' },
  { path: 'fazer-depoimento', loadChildren: './fazer-depoimento/fazer-depoimento.module#FazerDepoimentoPageModule' },
  { path: 'fazer-pergunta', loadChildren: './fazer-pergunta/fazer-pergunta.module#FazerPerguntaPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
