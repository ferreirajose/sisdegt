import { Injectable } from '@angular/core';
import { Observable, delay, flatMap, map, of } from 'rxjs';

import { Router } from '@angular/router';

import { TODOLIST } from '../data/todo';
import { Item, Todo } from '../interface/todo';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoList: Todo[] = TODOLIST;

  constructor(
    private router: Router,
    private tost: ToastrService
  ) {}

  getList(): Observable<Todo[]> {
    return of(this.todoList).pipe(delay(500));
  }

  getById(id: number): Observable<Todo> {
    return of(this.todoList).pipe(
      map(todos => todos.filter(todo => todo.id === id)),
      flatMap(todo => todo)
    );
  }

  addTodo(todo: Item) {
    let id = Math.floor(Math.random() * 100);
    const msn =  `Registro ${todo.title} Cadastrado com Sucesso!`;

    const item: Todo = {
      ...todo,
      id: id,
      isFavorite: false
    }

    this.todoList.push(item);

    this.navigateTo('/list', msn);

  }

  edit(updatedTodo: any, id: number): void {
    const index = this.todoList.findIndex(todo => todo.id === id);
    const msn =  `Registro ${updatedTodo.title} Atualizado com Sucesso!`;

    if (index !== -1) {
      this.todoList[index] = updatedTodo;
      this.navigateTo('/list', msn);
    }
  }

  deleteTodo(item: Todo): Observable<Todo> {
    let index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);
    return of(item).pipe(delay(500));
  }

  private navigateTo(url: string, msn: string): void {
    this.tost.success(msn);

    setTimeout(() => {
      this.router.navigate([url]);
    }, 100);
  }
}
