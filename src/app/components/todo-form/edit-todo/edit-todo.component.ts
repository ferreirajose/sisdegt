import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StatusEnum, StatusEnumMensagem, TodoService } from '@shared/index';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  formTodo = this.fb.group({
    id:[],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    status: [null],
    dateCreate: [],
    dateConclusion:[],
  });

  maxDate = new Date();
  id!: string;

  constructor(
    public todoService: TodoService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private localeService: BsLocaleService,
    private location: Location
  ) {
      this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(params => {
        this.id = params['id'] || 0;
        return this.todoService.getById(Number(this.id))
      }),
      tap(item => {
        this.setForm(item)
      }),
    ).subscribe()
  }

  redirect() {
    this.location.back();
  }

  get status () {
    return Object.keys(StatusEnum).map((key) => StatusEnum[key as keyof typeof StatusEnum]).filter(val => typeof val === 'string').map(item => {
      return { val: item, label: StatusEnumMensagem[StatusEnum[item]]}
    })
  }

  onUpdate(): void {
    const form = this.formTodo.getRawValue();
    const status = (form.status && form.status['val']) ? form.status['val'] : StatusEnum.PENDENTE;

    if (this.formTodo.invalid) {
      this.validateAllFormFields(this.formTodo);
      return
    }

    const item = {
      ...form,
      status
    }

    this.todoService.edit(item, Number(this.id))
  }

  compareFilter(t1: any, t2: any) {
    return t1 && t2 ? ( t1.val === t2.val) : t1 && t2;
  }

  private setForm(form: any) {

    const status = form.status;

    const item = {
      ...form,
      status: {val: status, label: StatusEnumMensagem[StatusEnum[status  as keyof typeof StatusEnum]]}
    }

    this.formTodo.patchValue(item);
  }

  isFieldValid(field: string): boolean | undefined {
    return !this.formTodo.get(field)?.valid && this.formTodo.get(field)?.touched;
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }

  private validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {

      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }

    });
  }

}
