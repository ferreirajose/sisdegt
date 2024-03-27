import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TodoService } from '@shared/index';
import { TodoFormComponent } from './todo-form.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  let todoService: jasmine.SpyObj<TodoService>;
  let locationService: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const todoServiceSpy = jasmine.createSpyObj('TodoService', ['addTodo']);
    const locationServiceSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      imports: [
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        BsDatepickerModule.forRoot(),
        ReactiveFormsModule
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: Location, useValue: locationServiceSpy },
      ]
    }).compileComponents();

    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    locationService = TestBed.inject(Location) as jasmine.SpyObj<Location>;

  });


  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect on calling redirect()', () => {
    component.redirect();
    expect(locationService.back).toHaveBeenCalled();
  });

  it('should reset form and add new todo on calling onSubmit()', () => {
    const resetSpy = spyOn(component.formTodo, 'reset');

    component.onSubmit();

    expect(todoService.addTodo).toHaveBeenCalled();
    expect(resetSpy).toHaveBeenCalled();
  });
});

