import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpParamsBuilder } from '../core/model/htttp-params-builder';
import { Pageable } from '../core/model/pageable.model';
import { Page } from '../core/model/page.model';
import { Pessoa } from './model/pessoa.model';
import { PessoaFilter } from './model/pessoa-filter.model';
import { map } from 'rxjs/operators';

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

  findByName(nome?: string) {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append(
        'Authorization',
        'Basic am9uYXRoYW4uYm9ycmFsaG9AZ21haWwuY29tOmFkbWlu'
      );
    return this.http
      .get<Page<Pessoa>>(`${this.URL}`, {
        headers,
        params: { nome, size: '10' },
      })
      .pipe(map((page) => page.content));
  }

  findById(id: number) {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append(
        'Authorization',
        'Basic am9uYXRoYW4uYm9ycmFsaG9AZ21haWwuY29tOmFkbWlu'
      );
    return this.http.get<Pessoa>(`${this.URL}/${id}`, { headers });
  }

  save(pessoa: Pessoa) {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json')
      .append(
        'Authorization',
        'Basic am9uYXRoYW4uYm9ycmFsaG9AZ21haWwuY29tOmFkbWlu'
      );

    if (pessoa.id) {
      return this.update(pessoa);
    }
    return this.http.post<Pessoa>(this.URL, pessoa, { headers });
  }

  update(pessoa: Pessoa) {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json')
      .append(
        'Authorization',
        'Basic am9uYXRoYW4uYm9ycmFsaG9AZ21haWwuY29tOmFkbWlu'
      );
    return this.http.put<Pessoa>(`${this.URL}/${pessoa.id}`, pessoa, { headers });
  }

  delete(id: number) {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append(
        'Authorization',
        'Basic am9uYXRoYW4uYm9ycmFsaG9AZ21haWwuY29tOmFkbWlu'
      );

    return this.http.delete(`${this.URL}/${id}`, { headers });
  }
}
