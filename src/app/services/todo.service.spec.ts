import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TodoService } from './todo.service';
import { TODOLIST } from '../data/todo';
import { ToastrService } from 'ngx-toastr';
import { StatusEnum } from '@shared/index';

describe('TodoService', () => {
  let service: TodoService;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const toastrSpyObj = jasmine.createSpyObj('ToastrService', ['success']);

    TestBed.configureTestingModule({
      providers: [
        TodoService,
        { provide: Router, useValue: routerSpyObj },
        { provide: ToastrService, useValue: toastrSpyObj }
      ]
    });

    service = TestBed.inject(TodoService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get todo list', fakeAsync(() => {
    service.getList().subscribe(list => {
      expect(list).toEqual(TODOLIST);
    });

    tick(500);
  }));

  it('should get todo by id', fakeAsync(() => {
    const id = 1;
    service.getById(id).subscribe(todo => {
      expect(todo.id).toEqual(id);
    });

    tick(500);
  }));

  it('should delete todo', fakeAsync(() => {
    const item = TODOLIST[0];
    service.deleteTodo(item).subscribe(() => {
      expect(service['todoList'].indexOf(item)).toBe(-1);
    });
    tick(500);
  }));

  it('should add todo successfully', fakeAsync(() => {
    const todo = {
      id: Math.floor(Math.random() * 100),
      title: 'Todo One',
      status: StatusEnum.CONCLUIDO,
      description: 'Description One',
      isFavorite: false,
      dateCreate: new Date('2024-03-27'),
      dateConclusion: new Date('2024-03-27')
    };

    const expectedMessage = `Registro ${todo.title} Cadastrado com Sucesso!`;

    service.addTodo(todo);
    expect(toastrSpy.success).toHaveBeenCalledWith(expectedMessage);

    tick(500);
  }));

  it('should edit todo', fakeAsync(() => {
    const id = 1;
    const updatedTodo = { id: id, title: 'Todo Two', isFavorite: true };
    const expectedMessage =  `Registro ${updatedTodo.title} Atualizado com Sucesso!`;

    service.edit(updatedTodo, id);
    expect(toastrSpy.success).toHaveBeenCalledWith(expectedMessage);
    tick(1000);
  }));


});
