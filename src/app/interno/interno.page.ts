import {AfterViewInit, Component} from '@angular/core';
import {ImportarDadosService} from '../services/importar-dados.service';

@Component({
  selector: 'app-interno',
  templateUrl: './interno.page.html',
  styleUrls: ['./interno.page.scss'],
})
export class InternoPage implements AfterViewInit {

  constructor(public importarDados: ImportarDadosService) {
  }

  ngAfterViewInit() {
    this.importarDados.esconderCarregamento();
  }

}
