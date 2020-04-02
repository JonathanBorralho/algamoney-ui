import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  template: `
    <p-message severity="error" [text]="text" *ngIf="hasError()"></p-message>
  `,
  styles: [
  ],
})
export class ErrorMessageComponent {

  @Input() text: string;
  @Input() control: AbstractControl;
  @Input() error: string;

  hasError(): boolean {
    return this.control?.hasError(this.error) && this.control?.dirty;
  }
}
