import { Component, OnInit } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

import { LancamentoService } from '../lancamento.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { CategoriaService } from '../categoria.service';
import { Pessoa } from 'src/app/pessoas/model/pessoa.model';
import { Categoria } from '../model/categoria.model';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
  preserveWhitespaces: true,
})
export class LancamentoCadastroComponent implements OnInit {
  categorias: Categoria[];
  pessoas: Pessoa[];
  tipoLancamento = [];
  pessoaSearch$: Subject<string> = new BehaviorSubject('');

  constructor(
    private lancamentoService: LancamentoService,
    private pessoaService: PessoaService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.tipoLancamento = [
      { label: 'Receita', value: 'RECEITA' },
      { label: 'Despesa', value: 'DESPESA' },
    ];
    this.pessoaSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((search) => this.pessoaService.findByName(search))
      )
      .subscribe((pessoas) => (this.pessoas = pessoas));

    this.categoriaService
      .findAll()
      .subscribe((categorias) => (this.categorias = categorias));
  }

  onSumit(form: NgForm): void {
    console.log(form.value);
  }

  hasError(control: AbstractControl): boolean {
    return control?.invalid && control?.dirty;
  }

  onFilter(search: string) {
    this.pessoaSearch$.next(search);
  }
}
