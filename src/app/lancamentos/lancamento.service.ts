import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Page } from '../core/model/page.model';
import { ResumoLancamento } from './model/resumo-lancamento.mode';
import { LancamentoFilter } from './model/lancamento-filter';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  private URL = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) {}

  findAll(filter?: LancamentoFilter): Observable<Page<ResumoLancamento>> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append(
        'Authorization',
        'Basic am9uYXRoYW4uYm9ycmFsaG9AZ21haWwuY29tOmFkbWlu'
      );

    let params = new HttpParams();

    if (filter?.descricao) {
      params = params.append('descricao', filter.descricao);
    }

    if (filter?.dataVencimentoDe) {
      params = params.append(
        'dataVencimentoDe',
        this.format(filter.dataVencimentoDe)
      );
    }

    if (filter?.dataVencimentoAte) {
      params = params.append(
        'dataVencimentoAte',
        this.format(filter.dataVencimentoAte)
      );
    }

    return this.http.get<Page<ResumoLancamento>>(`${this.URL}?resumo`, {
      headers,
      params,
    });
  }

  private format(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }
}
