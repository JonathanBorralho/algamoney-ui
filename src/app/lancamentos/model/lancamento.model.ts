export class Lancamento {
  id: number;
  version: number = 0;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  tipo: string = 'RECEITA';
  observacao: string;
  categoria: CategoriaId;
  pessoa: PessoaId;
}

export interface PessoaId {
  id: number;
  nome: string;
}

export interface CategoriaId {
  id: number;
  nome: string;
}
