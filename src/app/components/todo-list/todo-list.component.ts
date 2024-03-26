import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';

import { Todo } from 'src/app/interface/todo';
import { StatusEnum, StatusEnumMensagem, TodoService } from '@shared/index';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  todos$!: Observable<Todo[]>;
  statusControl = new FormControl('', []);

  constructor(
    private todoService: TodoService,
    private tost: ToastrService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.todos$ = this.todoService.getList();
  }

  filterByStatus(status: any | { val: StatusEnum, label: string}): void {
    if (status !== null && status.val !== 'VAZIO') {
      this.todos$ = this.todoService.getList().pipe(
        map(todos => todos.filter(todo => todo.status === status['val'] ))
      );
    } else {
      // If status is null, show all todos
      this.todos$ = this.todoService.getList();
    }
  }


  get status () {
    return Object.keys(StatusEnum).map((key) => StatusEnum[key as keyof typeof StatusEnum]).filter(val => typeof val === 'string').map(item => {
      return { val: item, label: StatusEnumMensagem[StatusEnum[item]]}
    })
  }

  remove(item: Todo): void {
    this.todoService.deleteTodo(item).subscribe({
      next: (res) => {
        this.tost.success(`Item ${res.title} Removido com Sucesso!`);
      },
      error: (erro) => {
        this.tost.error(`Error ao remover ${item.id}`);
      },
    })
  }

  edit(item: Todo): void {
    this.router.navigate(['/edit', item.id])
  }

  compareFilter(t1: any, t2: any) {
    console.log(t1, 't1')
    console.log(t2, 't2')
    return t1 && t2 ? ( t1.val === t2.val) : t1 && t2;
  }

}
