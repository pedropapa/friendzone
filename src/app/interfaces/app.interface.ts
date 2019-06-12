export interface UsuarioAdjetivoInterface {
  usuarioId: string;
  adjetivo: string;
  quantidade: number;
  porcentagem: number;
}

export interface PerguntaInterface {
  objectId: string,
  usuarioId: string;
  titulo: string;
  resposta: string;
  escondido: boolean;
}

export interface DepoimentoInterface {
  objectId: string,
  usuarioId: string;
  titulo: string;
  descricao: string;
  escondido: boolean;
}
