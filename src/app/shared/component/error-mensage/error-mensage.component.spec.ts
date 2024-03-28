import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMensageComponent } from './error-mensage.component';

describe('ErrorMensageComponent', () => {
  let component: ErrorMensageComponent;
  let fixture: ComponentFixture<ErrorMensageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMensageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMensageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
