export interface UsuarioAdjetivoInterface {
  usuarioId: string;
  adjetivo: string;
  quantidade: number;
  porcentagem: number;
}

export interface PerguntaInterface {
  usuarioId: string;
  titulo: string;
  resposta: string;
  escondido: boolean;
}

export interface DepoimentoInterface {
  usuarioId: string;
  titulo: string;
  descricao: string;
  escondido: boolean;
}
