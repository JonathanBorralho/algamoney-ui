import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './navbar/navbar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JsonDateInterceptor } from './interceptors/json-date.interceptor';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, ButtonModule],
  exports: [NavbarComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JsonDateInterceptor, multi: true },
  ],
})
export class CoreModule {}
