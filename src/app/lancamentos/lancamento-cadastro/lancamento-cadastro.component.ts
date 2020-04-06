import { Component, OnInit } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

import { MessageService } from 'primeng/api';

import { LancamentoService } from '../lancamento.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { CategoriaService } from '../categoria.service';
import { Pessoa } from 'src/app/pessoas/model/pessoa.model';
import { Categoria } from '../model/categoria.model';
import { ActivatedRoute } from '@angular/router';
import { Lancamento } from '../model/lancamento.model';

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
  lancamento = new Lancamento();

  constructor(
    private lancamentoService: LancamentoService,
    private pessoaService: PessoaService,
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private route: ActivatedRoute
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

    const id = this.route.snapshot.params['id'] as number;

    this.lancamentoService.findById(id).subscribe(lancamento => {
      this.lancamento = lancamento;
    });

  }

  onSumit(form: NgForm): void {
    this.lancamentoService.save(form.value).subscribe((_) => {
      form.reset({ tipo: 'RECEITA' });
      this.messageService.add({
        severity: 'success',
        detail: 'Lançamento salvo com sucesso!',
      });
    });
  }

  hasError(control: AbstractControl): boolean {
    return control?.invalid && control?.dirty;
  }

  onFilter(search: string) {
    this.pessoaSearch$.next(search);
  }
}
