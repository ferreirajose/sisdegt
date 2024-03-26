import { TestBed, ComponentFixture } from '@angular/core/testing';
import { StatusBadgeDirective } from './status-badge.directive';
import { Component, ViewChild } from '@angular/core';
import { StatusEnum, StatusEnumBadge } from '../enum/status';

describe('StatusBadgeDirective', () => {
  let directive: StatusBadgeDirective;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusBadgeDirective, TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    directive = fixture.componentInstance.statusBadgeDirective;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add badge class and appropriate background class based on input statusEnum', () => {
    directive.statusEnum = StatusEnum.CONCLUIDO;
    directive.ngOnInit();
    const element = fixture.debugElement.nativeElement;
    expect(element.classList).toContain('badge');
    expect(element.classList).toContain(`bg-${StatusEnumBadge[StatusEnum.CONCLUIDO]}`);
  });

  it('should add only badge class if statusEnum is not provided', () => {
    directive.ngOnInit();
    const element = fixture.debugElement.nativeElement;
    expect(element.classList).toContain('badge');
    expect(element.classList).not.toContain('bg-');
  });

  @Component({
    template: '<div [appStatusBadge]="statusEnum"></div>'
  })
  class TestComponent {
    statusEnum!: StatusEnum;
    @ViewChild(StatusBadgeDirective) statusBadgeDirective!: StatusBadgeDirective;
  }
});
