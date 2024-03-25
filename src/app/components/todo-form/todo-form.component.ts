import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Todo } from 'src/app/interface/todo';
import { TodoService } from 'src/app/services/todo.service';
import { StatusEnum } from 'src/app/shared/enum/status';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  formTodo = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    status: [''],
  });

  constructor(public todoService: TodoService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {

    const form = this.formTodo.getRawValue()

    this.todoService.addTodo(form as unknown as { title: string, description: string, status: StatusEnum});
    this.formTodo.reset();
  }

}
