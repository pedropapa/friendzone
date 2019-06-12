import {NgModule} from '@angular/core';
import {ApresentarAsyncDirective, CasoCarregandoDirective, CasoErroDirective, CasoResultadoDirective} from './apresentar-async.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    ApresentarAsyncDirective,
    CasoResultadoDirective,
    CasoCarregandoDirective,
    CasoErroDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ApresentarAsyncDirective,
    CasoResultadoDirective,
    CasoCarregandoDirective,
    CasoErroDirective,
  ]
})
export class DirectivesModule {
}
