import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '@shared/index';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  formTodo = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    status: [null],
  });

  constructor(
    public todoService: TodoService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      tap(val => console.log(val)),
      switchMap(params => {
        const id = params['id'] || 0;
        return this.todoService.getById(Number(id))
      }),
      tap(val => console.log(val)),
    ).subscribe()
  }

  onSubmit(): void {
  }
}
