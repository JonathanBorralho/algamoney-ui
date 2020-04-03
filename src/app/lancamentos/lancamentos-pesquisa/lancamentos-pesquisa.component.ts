import { Component } from '@angular/core';

import { Page } from 'src/app/core/model/page.model';
import { LancamentoService } from '../lancamento.service';
import { ResumoLancamento } from '../model/resumo-lancamento.mode';
import { LancamentoFilter } from '../model/lancamento-filter';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { Pageable } from 'src/app/core/model/pageable.model';
import { Table } from 'primeng/table/table';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  preserveWhitespaces: true,
})
export class LancamentosPesquisaComponent {
  constructor(private lancamentoService: LancamentoService) {}

  isLoading: boolean = false;
  page: Page<ResumoLancamento>;
  pageable: Pageable;
  filter: LancamentoFilter = new LancamentoFilter();

  onPesquisar(): void {
    this.search(this.filter, this.pageable);
  }

  search(filter?: LancamentoFilter, pageable?: Pageable): void {
    this.isLoading = true;
    this.lancamentoService.findAll(filter, pageable).subscribe((page) => {
      this.page = page;
      this.isLoading = false;
    });
  }

  loadLancamentos(event: LazyLoadEvent): void {
    this.pageable = Pageable.from(event);
    this.search(this.filter, this.pageable);
  }

  limpar(table: Table) {
    this.filter = new LancamentoFilter();
    this.pageable = Pageable.of(0, 5);
    table.reset();
    this.search(this.filter, this.pageable);
  }
}
