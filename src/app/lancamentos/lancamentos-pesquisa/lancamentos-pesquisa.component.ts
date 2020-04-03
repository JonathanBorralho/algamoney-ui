import { Component, OnInit } from '@angular/core';

import { tap } from 'rxjs/operators';

import { Page } from 'src/app/core/model/page.model';
import { LancamentoService } from '../lancamento.service';
import { ResumoLancamento } from '../model/resumo-lancamento.mode';
import { LancamentoFilter } from '../model/lancamento-filter';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  preserveWhitespaces: true,
})
export class LancamentosPesquisaComponent implements OnInit {
  constructor(private lancamentoService: LancamentoService) {}

  isLoading = false;
  page: Page<ResumoLancamento>;

  ngOnInit(): void {
    this.search();
  }

  onPesquisar(filter: LancamentoFilter): void {
    this.search(filter);
  }

  search(filter?: LancamentoFilter): void {
    this.lancamentoService
      .findAll(filter)
      .pipe(tap(() => (this.isLoading = true)))
      .subscribe((page) => {
        this.page = page;
        this.isLoading = false;
      });
  }
}
