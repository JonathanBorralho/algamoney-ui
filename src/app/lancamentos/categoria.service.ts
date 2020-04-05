import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Page } from '../core/model/page.model';
import { Categoria } from './model/categoria.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private URL = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) {}

  findAll() {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append(
        'Authorization',
        'Basic am9uYXRoYW4uYm9ycmFsaG9AZ21haWwuY29tOmFkbWlu'
      );

    return this.http.get<Page<Categoria>>(`${this.URL}?sort=nome`, {
      headers,
      params: { size: '20' },
    }).pipe(map(page => page.content));
  }
}
