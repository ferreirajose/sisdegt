import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
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

    tick(500); // Advance the fake clock to simulate the delay
  }));

  it('should add todo', fakeAsync(() => {
    const item = {
      id: 5,
      title: 'Todo One',
      status: StatusEnum.CONCLUIDO,
      description: 'dasdsad',
      isFavorite: false,
      dateCreate: new Date('4-15-2020'),
      dateConclusion: new Date('4-15-2020')
    }

    service.addTodo(item);
    expect(service['todoList'].length).toBeGreaterThan(0);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/list']);
    expect(toastrSpy.success).toHaveBeenCalled();
    tick(100);
  }));

  it('should edit todo', () => {
    const id = 1;
    const updatedTodo = { id: id, title: 'Updated Todo', isFavorite: true };
    service.edit(updatedTodo, id);
    expect(service['todoList'][0].title).toEqual(updatedTodo.title);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/list']);
    expect(toastrSpy.success).toHaveBeenCalled();
  });

  it('should delete todo', fakeAsync(() => {
    const item = TODOLIST[0];
    service.deleteTodo(item).subscribe(() => {
      expect(service['todoList'].indexOf(item)).toBe(-1);
    });
    tick(500);
  }));
});
