import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  preserveWhitespaces: true
})
export class LancamentosPesquisaComponent implements OnInit {
  constructor() {}

  lancamentos = [];

  ngOnInit(): void {
    this.lancamentos = [
      {
        id: 1,
        descricao: 'Cinema',
        dataVencimento: '2020-03-07',
        dataPagamento: null,
        valor: 44.0,
        tipo: 'DESPESA',
        categoria: 'Lazer',
        pessoa: 'Jonathan Sousa'
      },
      {
        id: 2,
        descricao: 'Churrascaria Barriga Verde',
        dataVencimento: '2020-03-08',
        dataPagamento: null,
        valor: 136.75,
        tipo: 'DESPESA',
        categoria: 'Alimentação',
        pessoa: 'Jonathan Sousa'
      },
      {
        id: 4,
        descricao: 'Aluguel de Março',
        dataVencimento: '2020-03-15',
        dataPagamento: null,
        valor: 600.0,
        tipo: 'DESPESA',
        categoria: 'Aluguel',
        pessoa: 'Jonathan Sousa'
      },
      {
        id: 5,
        descricao: 'IPVA 2020',
        dataVencimento: '2020-05-12',
        dataPagamento: null,
        valor: 846.5,
        tipo: 'DESPESA',
        categoria: 'Impostos',
        pessoa: 'Jonathan Sousa'
      },
      {
        id: 6,
        descricao: 'Uber',
        dataVencimento: '2020-03-08',
        dataPagamento: null,
        valor: 49.34,
        tipo: 'DESPESA',
        categoria: 'Transporte',
        pessoa: 'Jonathan Sousa'
      },
      {
        id: 7,
        descricao: 'Cartão Riachuelo',
        dataVencimento: '2020-03-05',
        dataPagamento: null,
        valor: 1112.22,
        tipo: 'DESPESA',
        categoria: 'Cartão de Crédito',
        pessoa: 'Jonathan Sousa'
      },
      {
        id: 8,
        descricao: 'Cartão Nubank',
        dataVencimento: '2020-03-27',
        dataPagamento: null,
        valor: 72.1,
        tipo: 'DESPESA',
        categoria: 'Cartão de Crédito',
        pessoa: 'Jonathan Sousa'
      },
      {
        id: 9,
        descricao: 'Carteira de Estudante',
        dataVencimento: '2020-03-10',
        dataPagamento: null,
        valor: 120.0,
        tipo: 'DESPESA',
        categoria: 'Transporte',
        pessoa: 'Jonathan Sousa'
      },
      {
        id: 10,
        descricao: 'Senior Team',
        dataVencimento: '2020-03-06',
        dataPagamento: '2020-03-06',
        valor: 120.0,
        tipo: 'RECEITA',
        categoria: 'Salário',
        pessoa: 'Jonathan Sousa'
      },
      {
        id: 11,
        descricao: 'Pague Menos',
        dataVencimento: '2020-03-05',
        dataPagamento: '2020-03-05',
        valor: 47.34,
        tipo: 'DESPESA',
        categoria: 'Farmácia',
        pessoa: 'Jonathan Sousa'
      }
    ];
  }
}
