import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { StatusEnum, TodoService } from '@shared/index';
import { of } from 'rxjs';
import { TODOLIST } from 'src/app/data/todo';
import { ToastrService } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { StatusBadgeDirective } from '@shared/directives/status-badge.directive';
import { StatusTransalaterPipe } from '@shared/pipe/status-transalater.pipe';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: jasmine.SpyObj<TodoService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const todoServiceSpy = jasmine.createSpyObj('TodoService', ['getList', 'deleteTodo']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent, StatusTransalaterPipe, StatusBadgeDirective ],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter todos by status', () => {
    const todos = [
      { id: 1, title: 'Todo 1', description: 'dasdsad', dateConclusion: new Date('4-15-2020'), dateCreate: new Date('4-15-2020'), status: StatusEnum.CONCLUIDO },
      { id: 2, title: 'Todo 2', description: 'dasdsad', dateConclusion: new Date('4-15-2020'), dateCreate: new Date('4-15-2020'),status: StatusEnum.EM_ANDAMENTO },
      { id: 3, title: 'Todo 3', description: 'dasdsad', dateConclusion: new Date('4-15-2020'), dateCreate: new Date('4-15-2020'), status: StatusEnum.CONCLUIDO }
    ];

    todoService.getList.and.returnValue(of(todos));

    component.ngOnInit();

    component.statusControl.setValue({ val: StatusEnum.CONCLUIDO, label: 'CONCLUIDO' } as any);

    component.filterByStatus({ val: StatusEnum.CONCLUIDO, label: 'CONCLUIDO' });

    component.todos$.subscribe(filteredTodos => {
      expect(filteredTodos.length).toBe(2);
      expect(filteredTodos.some(todo => todo.status === StatusEnum.CONCLUIDO)).toBeTrue();
    });
  });

  it('should reset filter when status is empty', () => {
    const todos = [
      { id: 1, title: 'Todo 1', description: 'dasdsad', dateConclusion: new Date('4-15-2020'), dateCreate: new Date('4-15-2020'), status: StatusEnum.CONCLUIDO },
      { id: 2, title: 'Todo 2', description: 'dasdsad', dateConclusion: new Date('4-15-2020'), dateCreate: new Date('4-15-2020'),status: StatusEnum.EM_ANDAMENTO },
      { id: 3, title: 'Todo 3', description: 'dasdsad', dateConclusion: new Date('4-15-2020'), dateCreate: new Date('4-15-2020'), status: StatusEnum.PENDENTE }
    ];

    todoService.getList.and.returnValue(of(todos));
    component.ngOnInit();
    component.statusControl.setValue({ val: StatusEnum.CONCLUIDO, label: 'CONCLUIDO' } as any);

    component.filterByStatus({ val: StatusEnum.CONCLUIDO, label: 'CONCLUIDO' });
    component.filterByStatus(null);

    component.todos$.subscribe(filteredTodos => {
      expect(filteredTodos.length).toBe(3);
    });
  });
});
