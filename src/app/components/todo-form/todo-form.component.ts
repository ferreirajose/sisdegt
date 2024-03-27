import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UntypedFormBuilder, Validators } from '@angular/forms';
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

  constructor(
    public todoService: TodoService,
    private fb: UntypedFormBuilder,
    private localeService: BsLocaleService,
    private location: Location
  ) {
    this.localeService.use('pt-br');
  }

  redirect() {
    this.location.back();
  }

  onSubmit(): void {
    const form = this.formTodo.getRawValue();
    const newForm = {
      ...form,
      status: StatusEnum.PENDENTE,
    };

    this.todoService.addTodo(newForm as Item);
    this.formTodo.reset();
  }
}
