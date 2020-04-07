import { Component, OnInit } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

import { MessageService } from 'primeng/api';
import { LocaleSettings } from 'primeng/calendar/calendar';
import { ptBR } from 'src/app/core/calendar.locale-settings';

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
  locale: LocaleSettings = ptBR;

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

    if (id) {
      this.lancamentoService.findById(id).subscribe((lancamento) => {
        this.lancamento = lancamento;
      });
    }
  }

  onSumit(form: NgForm): void {
    this.lancamentoService.save(form.value).subscribe((lancamento) => {
      this.lancamento = lancamento;
      this.messageService.add({
        severity: 'success',
        detail: 'Lançamento salvo com sucesso!',
      });
    });
  }

  onFilter(search: string) {
    this.pessoaSearch$.next(search);
  }
}
