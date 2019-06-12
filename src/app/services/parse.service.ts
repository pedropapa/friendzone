import {Injectable} from '@angular/core';
import * as Parse from 'parse';
import {environment} from '../../environments/environment';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DepoimentoInterface, PerguntaInterface, UsuarioAdjetivoInterface} from '../interfaces/app.interface';
import {AuthService} from './auth.service';

Parse.initialize(environment.parse_app_id, environment.parse_js_key);
(Parse as any).serverURL = environment.parse_server_url;

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  constructor(public auth: AuthService) {

  }

  public query(model: string) {
    return new Parse.Query(model);
  }

  public depoimento(depoimento: DepoimentoInterface) {
    const query = this.query('Depoimento');

    return from(query.get(depoimento.objectId));
  }

  public pergunta(pergunta: PerguntaInterface) {
    const query = this.query('Pergunta');

    return from(query.get(pergunta.objectId));
  }

  public depoimentos(userId: string, mostrarEscondidos?: boolean, limite?: number): Observable<Array<DepoimentoInterface>> {
    const query = this.query('Depoimento');

    if (limite) {
      query.limit(limite);
    }

    if (!mostrarEscondidos) {
      query.equalTo('escondido', false);
    }

    query.equalTo('usuarioId', userId);

    query.descending('createdAt');

    return from(query.find()).pipe(
      map(depoimentos => depoimentos.map(val => val.toJSON())),
    );
  }

  public perguntas(userId: string, mostrarEscondidos?: boolean, limite?: number): Observable<Array<PerguntaInterface>> {
    const query = this.query('Pergunta');

    if (limite) {
      query.limit(limite);
    }

    if (!mostrarEscondidos) {
      query.equalTo('escondido', false);
    }

    query.equalTo('usuarioId', userId);

    query.descending('createdAt');

    return from(query.find()).pipe(
      map(perguntas => perguntas.map(val => val.toJSON())),
    );
  }

  public async adjetivos(userId: string): Promise<Array<UsuarioAdjetivoInterface>> {
    const query = this.query('UsuarioAdjetivo');

    query.equalTo('usuarioId', userId);

    const adjetivos = await from(query.find()).pipe(
      map(adjetivos => adjetivos.map(val => val.toJSON())),
    ).toPromise();

    const resultado: Array<UsuarioAdjetivoInterface> = [];

    let total = 0;

    adjetivos.forEach(() => ++total);

    adjetivos.forEach(adjetivo => {
      const registro = resultado.find(adv => adv.adjetivo === adjetivo.adjetivo);

      if (!registro) {
        resultado.push({
          adjetivo: adjetivo.adjetivo,
          quantidade: 1,
          usuarioId: (this.auth.facebookAuthData) ? this.auth.facebookAuthData.userID : '',
          porcentagem: parseFloat((100 / total).toFixed(1)),
        });
      } else {
        registro.quantidade += 1;
        registro.porcentagem = parseFloat(((100 * registro.quantidade) / total).toFixed(1));
      }
    });

    return resultado;
  }

  public todosAdjetivos(): Observable<Array<any>> {
    const query = this.query('Adjetivo');

    query.ascending('nome');

    return from(query.find()).pipe(
      map(adjetivos => adjetivos.map(val => val.toJSON())),
    );
  }
}
