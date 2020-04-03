import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
  preserveWhitespaces: true
})
export class LancamentoCadastroComponent implements OnInit {
  categorias = [];
  pessoas = [];
  tipoLancamento = [];

  constructor() { }

  ngOnInit(): void {
    this.tipoLancamento = [
      { label: 'Receita', value: 'RECEITA' },
      { label: 'Despesa', value: 'DESPESA' }
    ];
    this.categorias = [
      { label: 'Alimentação', value: 1 },
      { label: 'Transporte', value: 2 }
    ];
    this.pessoas = [
      { label: 'Jonathan Sousa', value: 1 },
      { label: 'Maria Silva', value: 2 }
    ];
  }

  onSumit(form: NgForm): void {
    console.log(JSON.stringify(form.value));
  }

  hasError(control: AbstractControl): boolean {
    return control?.invalid && control?.dirty;
  }

}
