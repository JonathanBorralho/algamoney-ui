import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Page } from '../core/model/page.model';
import { ResumoLancamento } from './model/resumo-lancamento.model';
import { LancamentoFilter } from './model/lancamento-filter';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Pageable } from '../core/model/pageable.model';
import { HttpParamsBuilder } from '../core/model/htttp-params-builder';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  private URL = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) {}

  findAll(
    filter?: LancamentoFilter,
    pageable?: Pageable
  ): Observable<Page<ResumoLancamento>> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append(
        'Authorization',
        'Basic am9uYXRoYW4uYm9ycmFsaG9AZ21haWwuY29tOmFkbWlu'
      );

    const builder = new HttpParamsBuilder();

    if (filter?.descricao) {
      builder.append('descricao', filter.descricao);
    }

    if (filter?.dataVencimentoDe) {
      builder.append(
        'dataVencimentoDe',
        this.format(filter.dataVencimentoDe)
      );
    }

    if (filter?.dataVencimentoAte) {
      builder.append(
        'dataVencimentoAte',
        this.format(filter.dataVencimentoAte)
      );
    }

    if (pageable) {
      builder.append('page', pageable.page.toString());
      builder.append('size', pageable.size.toString());

      if (pageable?.sort) {
        builder.append('sort', pageable.sort);
      }
    }

    return this.http.get<Page<ResumoLancamento>>(`${this.URL}?resumo`, {
      headers,
      params: builder.build(),
    });
  }

  private format(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }
}
