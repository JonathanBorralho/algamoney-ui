import { LazyLoadEvent } from 'primeng/api/public_api';

export class Pageable {
  constructor(public page?: number, public size?: number, public sort?: string) {}

  static of(page: number, size: number) {
    return new Pageable(page, size);
  }

  static from(event: LazyLoadEvent): Pageable {
    const size = event.rows;
    const page = event.first / event.rows;
    let sort = event.sortField;

    if (sort) {
      sort += event.sortOrder == 1 ? ',asc' : ',desc';
    }
    return new Pageable(page, size, sort);
  }
}
