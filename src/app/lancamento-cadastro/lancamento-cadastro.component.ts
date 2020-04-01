import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
  preserveWhitespaces: true
})
export class LancamentoCadastroComponent implements OnInit {
  categorias = [];
  pessoas = [];
  valor = null;
  tipoLancamento = [];
  tipoLancamentoDefault = 'RECEITA';
  dataVencimento: Date;
  dataPagamento: Date;
  constructor() { }

  ngOnInit(): void {
    this.tipoLancamento = [
      { label: 'Receita', value: 'RECEITA' },
      { label: 'Despesa', value: 'DESPESA' }
    ];
  }

}
