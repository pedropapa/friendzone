import {Injectable} from '@angular/core';
import * as Parse from 'parse';
import {environment} from '../../environments/environment';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AdjetivoInterface, DepoimentoInterface, PerguntaInterface, UsuarioAdjetivoInterface} from '../interfaces/app.interface';
import {AuthService} from './auth.service';
import {FacebookUser} from '../interfaces/facebook.interface';

Parse.initialize(environment.parse_app_id, environment.parse_js_key, environment.parse_master_key);
(Parse as any).serverURL = environment.parse_server_url;
(Parse as any).masterKey = environment.parse_master_key;

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

  public async responderPergunta(perguntaDados: PerguntaInterface, resposta: string) {
    const pergunta = await this.pergunta(perguntaDados).toPromise();

    pergunta.set('resposta', resposta);

    return pergunta.save();
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

  public async adjetivos(userId: string, atribuidoPor?: string): Promise<Array<UsuarioAdjetivoInterface>> {
    const query = this.query('UsuarioAdjetivo');

    query.equalTo('usuarioId', userId);

    if (atribuidoPor) {
      query.equalTo('atribuidoPor', atribuidoPor);
    }

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
    const query = this.query('Adjetivos');

    query.ascending('nome');

    return from(query.find()).pipe(
      map(adjetivos => adjetivos.map(val => val.toJSON())),
    );
  }

  public async atribuirAdjetivo(adjetivo: AdjetivoInterface, usuario: FacebookUser): Promise<any> {
    const query = this.query('UsuarioAdjetivo');

    query.equalTo('usuarioId', usuario.id);
    query.equalTo('atribuidoPor', this.auth.facebookUserData.id);
    query.equalTo('adjetivo', adjetivo.nome);

    const adjetivoAtribuido = await query.first();

    if (adjetivoAtribuido) {
      throw 'Adjetivo já atribuído para esse usuário.';
    }

    const UsuarioAdjetivoModel = Parse.Object.extend('UsuarioAdjetivo');

    const usuarioAdjetivo = new UsuarioAdjetivoModel();

    usuarioAdjetivo.set('usuarioId', usuario.id);
    usuarioAdjetivo.set('atribuidoPor', this.auth.facebookUserData.id);
    usuarioAdjetivo.set('adjetivo', adjetivo.nome);

    return usuarioAdjetivo.save(null, {useMasterKey: true});
  }

  public async criarDepoimento(titulo: string, descricao: string, usuario: FacebookUser): Promise<any> {
    const DepoimentoModel = Parse.Object.extend('Depoimento');

    const depoimento = new DepoimentoModel();

    depoimento.set('usuarioId', usuario.id);
    depoimento.set('atribuidoPor', this.auth.facebookUserData.id);
    depoimento.set('titulo', titulo);
    depoimento.set('descricao', descricao);
    depoimento.set('escondido', false);

    return depoimento.save(null, {useMasterKey: true});
  }

  public async criarPergunta(titulo: string, usuario: FacebookUser): Promise<any> {
    const PerguntaModel = Parse.Object.extend('Pergunta');

    const pergunta = new PerguntaModel();

    pergunta.set('usuarioId', usuario.id);
    pergunta.set('atribuidoPor', this.auth.facebookUserData.id);
    pergunta.set('titulo', titulo);
    pergunta.set('escondido', false);

    return pergunta.save(null, {useMasterKey: true});
  }
}
