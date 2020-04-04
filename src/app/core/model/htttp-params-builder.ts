import { HttpParams } from '@angular/common/http';

export class HttpParamsBuilder {
  private httpParams: HttpParams;
  private params: Map<string, string>;

  constructor() {
    this.httpParams = new HttpParams();
    this.params = new Map<string, string>();
  }

  append(param: string, value: string) {
    this.params.set(param, value);
  }

  build(): HttpParams {
    for (const [key, value] of this.params) {
      this.httpParams = this.httpParams.append(key, value);
    }
    return this.httpParams;
  }
}
