import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from './directives/directives.module';
import { PipeModule } from './pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports:[
    DirectivesModule,
    PipeModule
  ],
  declarations: []
})
export class SharedModule { }
