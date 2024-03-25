import { Pipe, PipeTransform } from '@angular/core';
import { StatusEnum, StatusEnumMensagem } from '../enum/status';

@Pipe({
  name: 'statusTransalater'
})
export class StatusTransalaterPipe implements PipeTransform {

  transform(value: StatusEnum): any {
    return StatusEnumMensagem[value];
}

}
