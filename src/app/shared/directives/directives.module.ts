import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgeDirective } from './status-badge.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [StatusBadgeDirective],
  exports: [StatusBadgeDirective],
})
export class DirectivesModule {}
