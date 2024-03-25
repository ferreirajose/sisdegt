import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/interface/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  readonly todos$: Observable<Todo[]> = this.todoService.getList();

  constructor(
    private todoService: TodoService,
    private tost: ToastrService,
    private router: Router
  ) { }


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

}
