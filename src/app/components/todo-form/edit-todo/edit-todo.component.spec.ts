import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

import { EditTodoComponent } from './edit-todo.component';
import { StatusEnum, TodoService } from '@shared/index';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditTodoComponent', () => {
  let component: EditTodoComponent;
  let fixture: ComponentFixture<EditTodoComponent>;
  let todoService: jasmine.SpyObj<TodoService>;
  let locationService: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const todoServiceSpy = jasmine.createSpyObj('TodoService', ['getById', 'edit']);
    const locationServiceSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [EditTodoComponent],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: Location, useValue: locationServiceSpy },
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        },
        BsLocaleService
      ]
    }).compileComponents();

    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    locationService = TestBed.inject(Location) as jasmine.SpyObj<Location>;

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTodoComponent);
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

  it('should call todoService.getById on initialization', () => {
    expect(todoService.getById).toHaveBeenCalledWith(1);
  });

  it('should call todoService.edit when onUpdate is called', () => {
    const formData = {
      id: 1,
      title: 'Todo One',
      status: StatusEnum.PENDENTE,
      description: 'dasdsad',
      dateCreate: new Date('4-15-2020'),
      dateConclusion: new Date('4-15-2020')
    } as any;

    component.formTodo.patchValue(formData);
    component.onUpdate();

    expect(todoService.edit).toHaveBeenCalledWith(formData, 1);
  });

  it('should return false for a valid and touched field', () => {

    component.formTodo.setValue({
      id: null,
      title: 'Test Title',
      description: 'Test Description',
      status: null,
      dateCreate: null,
      dateConclusion: null,
    });

    component.formTodo.get('title')?.markAsTouched();

    expect(component.isFieldValid('title')).toBe(false);
  });

});
