import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { LocaleSettings } from 'primeng/calendar';
import { ptBR } from '../../core/calendar.locale-settings';

import { Page } from 'src/app/core/model/page.model';
import { Pageable } from 'src/app/core/model/pageable.model';
import { LancamentoService } from '../lancamento.service';
import { ResumoLancamento } from '../model/resumo-lancamento.model';
import { LancamentoFilter } from '../model/lancamento-filter';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  preserveWhitespaces: true,
})
export class LancamentosPesquisaComponent implements OnInit {
  constructor(
    private lancamentoService: LancamentoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  isLoading: boolean;
  page: Page<ResumoLancamento>;
  pageable: Pageable;
  filter: LancamentoFilter;
  @ViewChild('table') table: Table;
  locale: LocaleSettings = ptBR;

  ngOnInit(): void {
    this.pageable = Pageable.of(0, 5);
    this.filter = new LancamentoFilter();
    this.search();
  }

  onPesquisar(): void {
    this.search();
  }

  loadLancamentos(event: LazyLoadEvent): void {
    this.pageable = Pageable.from(event);
    this.search();
  }

  private search(): void {
    this.isLoading = true;
    this.lancamentoService
      .findAll(this.filter, this.pageable)
      .subscribe((page) => {
        this.page = page;
        this.isLoading = false;
      });
  }

  onLimpar(): void {
    this.pageable = Pageable.of(0, 5);
    this.filter = new LancamentoFilter();
    this.table.reset();
  }

  onExcluir(lancamento: ResumoLancamento) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este registro?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.excluir(lancamento.id),
    });
  }

  private excluir(id: number) {
    this.lancamentoService.delete(id).subscribe(() => {
      this.search();
      this.messageService.add({
        severity: 'success',
        detail: 'Excluído com sucesso!',
      });
    });
  }
}
