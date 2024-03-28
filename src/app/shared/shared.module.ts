import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from './directives/directives.module';
import { PipeModule } from './pipe/pipe.module';
import { ComponentModule } from './component/component.module';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports:[
    DirectivesModule,
    PipeModule,
    ComponentModule
  ],
  declarations: []
})
export class SharedModule { }
