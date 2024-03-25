import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusTransalaterPipe } from './status-transalater.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [StatusTransalaterPipe],
  exports: [StatusTransalaterPipe],
})
export class PipeModule {}
