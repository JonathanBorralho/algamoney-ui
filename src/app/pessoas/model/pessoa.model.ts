export class Pessoa {
  id: number;
  version: number = 0;
  nome: string;
  ativo: boolean = true;
  endereco: Endereco = new Endereco();
}

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}
