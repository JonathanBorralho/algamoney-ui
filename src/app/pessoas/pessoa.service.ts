import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpParamsBuilder } from '../core/model/htttp-params-builder';
import { Pageable } from '../core/model/pageable.model';
import { Page } from '../core/model/page.model';
import { Pessoa } from './model/pessoa.model';
import { PessoaFilter } from './model/pessoa-filter.model';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private URL = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) {}

  findAll(
    filter?: PessoaFilter,
    pageable?: Pageable
  ): Observable<Page<Pessoa>> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append(
        'Authorization',
        'Basic am9uYXRoYW4uYm9ycmFsaG9AZ21haWwuY29tOmFkbWlu'
      );
    const builder = new HttpParamsBuilder();

    if (filter?.nome) {
      builder.append('nome', filter.nome);
    }

    if (pageable) {
      builder.append('page', pageable.page.toString());
      builder.append('size', pageable.size.toString());

      if (pageable?.sort) {
        builder.append('sort', pageable.sort);
      }
    }

    return this.http.get<Page<Pessoa>>(`${this.URL}`, {
      headers,
      params: builder.build(),
    });
  }
}
