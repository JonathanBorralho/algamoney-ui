export interface Pessoa {
  id: number;
  nome: string;
  ativo: boolean;
  endereco: Endereco;
}

export interface Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}
