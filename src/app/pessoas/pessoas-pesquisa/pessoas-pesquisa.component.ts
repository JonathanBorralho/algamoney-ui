import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';

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

  constructor(private pessoaServive: PessoaService) {}

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
}
