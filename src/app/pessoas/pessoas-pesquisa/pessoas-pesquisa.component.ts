import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import {
  LazyLoadEvent,
  ConfirmationService,
  MessageService,
} from 'primeng/api';

import { Page } from 'src/app/core/model/page.model';
import { Pageable } from 'src/app/core/model/pageable.model';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../model/pessoa.model';
import { PessoaFilter } from '../model/pessoa-filter.model';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css'],
  preserveWhitespaces: true,
})
export class PessoasPesquisaComponent implements OnInit {
  @ViewChild('table') table: Table;
  isLoading = false;
  page: Page<Pessoa>;
  pageable: Pageable;
  filter: PessoaFilter;

  constructor(
    private pessoaServive: PessoaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.pageable = Pageable.of(0, 5);
    this.filter = new PessoaFilter();
    this.search();
  }

  onPesquisar() {
    this.search();
  }

  private search() {
    this.isLoading = true;
    this.pessoaServive.findAll(this.filter, this.pageable).subscribe((page) => {
      this.page = page;
      this.isLoading = false;
    });
  }

  onLazyLoad(event: LazyLoadEvent) {
    this.pageable = Pageable.from(event);
    this.search();
  }

  onLimpar() {
    this.pageable = Pageable.of(0, 5);
    this.filter = new PessoaFilter();
    this.table.reset();
  }

  onExcluir(pessoa: Pessoa) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este registro?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.excluir(pessoa.id),
    });
  }

  private excluir(id: number) {
    this.pessoaServive.delete(id).subscribe((_) => {
      this.messageService.add({
        severity: 'success',
        detail: 'Pessoa excluída com sucesso!',
      });
      this.table.reset();
    });
  }
}
