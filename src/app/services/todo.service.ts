import { Injectable } from '@angular/core';
import { Observable, delay, flatMap, map, of, tap } from 'rxjs';

import { Router } from '@angular/router';

import { TODOLIST } from '../data/todo';
import { Item, Todo } from '../interface/todo';
import { StatusEnum } from '../shared/enum/status';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoList: Todo[] = TODOLIST;

  constructor(
    private router: Router
  ) {

  }


  getList(): Observable<Todo[]> {
    return of(this.todoList).pipe(delay(500));
  }

  getById(id: number): Observable<Todo> {
    console.log(id, 'id');
    return of(this.todoList).pipe(
      tap(val => console.log(val, 'getById')),
      map(todos => todos.filter(todo => todo.id === id)),
      tap(val => console.log(val, 'getById w')),
      flatMap(todo => todo)
    );
  }


  deleteTodo(item: Todo): Observable<Todo> {
    let index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);

    return of(item).pipe(delay(500));
  }

  addTodo(task: Item) {
    let id = this.todoList.length + 2;

    const item: Todo = {
      ...task,
      id: id,
      isFavorite: false
    }

    this.todoList.unshift(item);

    setTimeout(() => {
      this.router.navigate(['/list']);
    }, 100);

  }

}
