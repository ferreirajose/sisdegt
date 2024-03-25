import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

import { Router } from '@angular/router';

import { TODOLIST } from '../data/todo';
import { Todo } from '../interface/todo';
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

  deleteTodo(item: Todo): Observable<Todo> {
    let index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);

    return of(item).pipe(delay(500));
  }

  addTodo(task: { title: string, description: string, status: StatusEnum}) {
    let id = this.todoList.length + 2;

    const item: Todo = {
      ...task,
      id: id,
      date: new Date(),
      isFavorite: false
    }

    this.todoList.unshift(item);

    setTimeout(() => {
      this.router.navigate(['/list']);
    }, 100);

  }

}
