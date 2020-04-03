import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [CommonModule, MessageModule],
  exports: [ErrorMessageComponent]
})
export class SharedModule {}
