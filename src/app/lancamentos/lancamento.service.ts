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

    const paramsBuilder = new HttpParamsBuilder();

    if (filter?.descricao) {
      paramsBuilder.append('descricao', filter.descricao);
    }

    if (filter?.dataVencimentoDe) {
      paramsBuilder.append(
        'dataVencimentoDe',
        this.format(filter.dataVencimentoDe)
      );
    }

    if (filter?.dataVencimentoAte) {
      paramsBuilder.append(
        'dataVencimentoAte',
        this.format(filter.dataVencimentoAte)
      );
    }

    if (pageable) {
      paramsBuilder.append('page', pageable.page.toString());
      paramsBuilder.append('size', pageable.size.toString());

      if (pageable?.sort) {
        paramsBuilder.append('sort', pageable.sort);
      }
    }

    let params = paramsBuilder.build();

    return this.http.get<Page<ResumoLancamento>>(`${this.URL}?resumo`, {
      headers,
      params,
    });
  }

  private format(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }
}
