import { Component, OnInit, ViewChild } from '@angular/core';

import { Page } from 'src/app/core/model/page.model';
import { LancamentoService } from '../lancamento.service';
import { ResumoLancamento } from '../model/resumo-lancamento.model';
import { LancamentoFilter } from '../model/lancamento-filter';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { Pageable } from 'src/app/core/model/pageable.model';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  preserveWhitespaces: true,
})
export class LancamentosPesquisaComponent implements OnInit {
  constructor(private lancamentoService: LancamentoService) {}

  isLoading: boolean;
  page: Page<ResumoLancamento>;
  pageable: Pageable;
  filter: LancamentoFilter;
  @ViewChild('table') table: Table;

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
    this.lancamentoService.findAll(this.filter, this.pageable).subscribe((page) => {
      this.page = page;
      this.isLoading = false;
    });
  }

  onLimpar(): void {
    this.pageable = Pageable.of(0, 5);
    this.filter = new LancamentoFilter();
    this.table.reset();
  }
}
