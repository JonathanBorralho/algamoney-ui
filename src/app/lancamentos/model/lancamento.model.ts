export interface Lancamento {
  id: number;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  tipo: string;
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
