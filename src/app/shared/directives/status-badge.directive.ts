import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { StatusEnum, StatusEnumBadge } from '../enum/status';

@Directive({
  selector: '[appStatusBadge]'
})
export class StatusBadgeDirective implements OnInit {

  @Input('appStatusBadge') statusEnum!: StatusEnum;

  constructor(
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    if (this.statusEnum) {
      this.elementRef.nativeElement.classList.add('badge');
      this.elementRef.nativeElement.classList.add(`bg-${StatusEnumBadge[this.statusEnum] || 'secondary'}`);
    }
  }
}
