// import { TestBed, ComponentFixture, async, waitForAsync } from '@angular/core/testing';
// import { StatusBadgeDirective } from './status-badge.directive';
// import { CUSTOM_ELEMENTS_SCHEMA, Component, Directive, ViewChild } from '@angular/core';
// import { StatusEnum, StatusEnumBadge } from '../enum/status';

// @Component({
//   template: '<div [appStatusBadge]="statusEnum"></div>'
// })

// @Directive({
//   selector: '[appStatusBadge]'
// })

// class FakeDirective {

// }
// class TestComponent {
//   statusEnum = StatusEnum.CONCLUIDO;
//   @ViewChild(StatusBadgeDirective) statusBadgeDirective!: StatusBadgeDirective;
// }

// describe('StatusBadgeDirective', () => {
//   let directive: StatusBadgeDirective;
//   let component: TestComponent;
//   let fixture: ComponentFixture<TestComponent>;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//         declarations: [
//           StatusBadgeDirective, TestComponent,
//           FakeDirective
//         ],
//         schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//     .compileComponents();
//   }));

//   beforeEach(waitForAsync(() => {
//     fixture = TestBed.createComponent(TestComponent);
//     directive = TestBed.overrideDirective(StatusBadgeDirective, FakeDirective)
//     .compileComponents();

//     //directive = directive.statusBadgeDirective;

//     //component = fixture.componentInstance;
//     fixture.detectChanges();

//   }));

//   it('should create an instance', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should add only badge class if statusEnum is not provided', () => {
//      // Trigger change detection to initialize the ViewChild
//     fixture.whenStable().then(() => {
//       directive.ngOnInit();
//       const element = fixture.debugElement.nativeElement;
//       expect(element.classList).toContain('badge');
//       expect(element.classList).not.toContain('bg-');
//     });
//   });

// });

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StatusBadgeDirective } from './status-badge.directive';
import { StatusEnum } from '../enum/status';

@Component({
  template: `
    <div [appStatusBadge]="statusEnum"></div>
  `
})
class TestComponent {
  statusEnum!: StatusEnum;
}

describe('StatusBadgeDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, StatusBadgeDirective],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.directive(StatusBadgeDirective));
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should add badge class and background class when statusEnum is CONCLUIDO', () => {
      component.statusEnum = StatusEnum.CONCLUIDO;
      fixture.detectChanges();
      const divElement: HTMLDivElement = debugElement.nativeElement;

      expect(divElement.classList.contains('badge')).toBeTruthy();
      expect(divElement.classList.contains('bg-success')).toBeTruthy();
  });

  it('should add default background class when statusEnum is PENDENTE', () => {
    component.statusEnum = StatusEnum.PENDENTE;
    fixture.detectChanges();
    const divElement: HTMLDivElement = debugElement.nativeElement;
    expect(divElement.classList.contains('badge')).toBeTruthy();
    expect(divElement.classList.contains('bg-warning')).toBeTruthy();
  });

});
