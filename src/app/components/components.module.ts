import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EstadoVazioComponent} from './estado-vazio/estado-vazio.component';

@NgModule({
  declarations: [
    EstadoVazioComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EstadoVazioComponent,
  ]
})
export class ComponentsModule { }
