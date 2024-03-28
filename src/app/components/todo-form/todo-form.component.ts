import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { TodoService } from '@shared/index';
import { StatusEnum } from '@shared/index';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { Item } from 'src/app/interface/todo';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  formTodo = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    status: [null],
    dateCreate: [],
    dateConclusion: [],
  });

  maxDate = new Date();
  formSumitAttempt = false;

  constructor(
    public todoService: TodoService,
    private fb: UntypedFormBuilder,
    private localeService: BsLocaleService,
    private location: Location
  ) {
    this.localeService.use('pt-br');
  }

  redirect(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.formTodo.invalid) {
      this.validateAllFormFields(this.formTodo);
      return
    }

    const form = this.formTodo.getRawValue();
    const newForm = {
      ...form,
      status: StatusEnum.PENDENTE,
    };

    this.todoService.addTodo(newForm as Item);
    this.formTodo.reset();
  }

  isFieldValid(field: string) {
    return !this.formTodo.get(field)?.valid && this.formTodo.get(field)?.touched;
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }

  private validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {

      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }

    });
  }

}
