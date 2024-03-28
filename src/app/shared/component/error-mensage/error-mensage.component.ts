import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-mensage.component.html',
  styleUrls: ['./error-mensage.component.css']
})
export class ErrorMensageComponent {

  @Input() errorMsg: string | undefined;
  @Input() displayError: boolean | undefined;

  constructor() { }

}
