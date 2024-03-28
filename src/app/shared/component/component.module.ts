import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMensageComponent } from './error-mensage/error-mensage.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ErrorMensageComponent],
  declarations: [ErrorMensageComponent]
})
export class ComponentModule { }
