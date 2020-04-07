import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found.component';

import { JsonDateInterceptor } from './interceptors/json-date.interceptor';

@NgModule({
  declarations: [NavbarComponent, NotFoundComponent],
  imports: [CommonModule, RouterModule, ButtonModule],
  exports: [NavbarComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JsonDateInterceptor, multi: true },
  ],
})
export class CoreModule {}
