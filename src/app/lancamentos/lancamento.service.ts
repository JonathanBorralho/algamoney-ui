import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Page } from '../core/model/page.model';
import { Pageable } from '../core/model/pageable.model';
import { HttpParamsBuilder } from '../core/model/htttp-params-builder';
import { ResumoLancamento } from './model/resumo-lancamento.model';
import { LancamentoFilter } from './model/lancamento-filter';

import '../core/extensions/date.extensions';
import { Lancamento } from './model/lancamento.model';

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
      builder.append('dataVencimentoDe', this.format(filter.dataVencimentoDe));
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

  findById(id: number): Observable<Lancamento> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append(
        'Authorization',
        'Basic am9uYXRoYW4uYm9ycmFsaG9AZ21haWwuY29tOmFkbWlu'
      );
    return this.http.get<Lancamento>(`${this.URL}/${id}`, { headers });
  }

  save(lancamento: Lancamento): Observable<Lancamento> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json')
      .append(
        'Authorization',
        'Basic am9uYXRoYW4uYm9ycmFsaG9AZ21haWwuY29tOmFkbWlu'
      );

    if (lancamento.id) {
      return this.update(lancamento);
    }
    return this.http.post<Lancamento>(this.URL, lancamento, { headers });
  }

  private update(lancamento: Lancamento): Observable<Lancamento> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json')
      .append(
        'Authorization',
        'Basic am9uYXRoYW4uYm9ycmFsaG9AZ21haWwuY29tOmFkbWlu'
      );

    return this.http.put<Lancamento>(`${this.URL}/${lancamento.id}`, lancamento, { headers });
  }

  delete(id: number): Observable<void> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append(
        'Authorization',
        'Basic am9uYXRoYW4uYm9ycmFsaG9AZ21haWwuY29tOmFkbWlu'
      );
    return this.http.delete<void>(`${this.URL}/${id}`, { headers });
  }

  private format(date: Date): string {
    return date.toFormat('YYYY-MM-DD');
  }
}
