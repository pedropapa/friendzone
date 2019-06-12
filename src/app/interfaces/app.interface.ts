export interface UsuarioAdjetivoInterface {
  usuarioId: string;
  adjetivo: string;
  quantidade: number;
  porcentagem: number;
}

export interface AdjetivoInterface {
  objectId: string,
  createdAt: string,
  nome: string;
  positivo: boolean;
}

export interface PerguntaInterface {
  objectId: string,
  createdAt: string,
  usuarioId: string;
  titulo: string;
  resposta: string;
  escondido: boolean;
}

export interface DepoimentoInterface {
  objectId: string,
  createdAt: string,
  usuarioId: string;
  titulo: string;
  descricao: string;
  escondido: boolean;
}
