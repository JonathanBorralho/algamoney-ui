export interface ResumoLancamento {
  id: number;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  tipo: string;
  categoria: string;
  pessoa: string;
}
