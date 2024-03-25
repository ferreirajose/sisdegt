import { Todo } from "../interface/todo";
import { StatusEnum } from "../shared/enum/status";

export const TODOLIST: Todo[] = [
  {
    id: 1,
    title: 'Todo One',
    status: StatusEnum.CONCLUIDO,
    description: 'dasdsad',
    isFavorite: false,
    date: new Date('4-15-2020')
  },
  {
    id: 2,
    title: 'Todo Two',
    status: StatusEnum.EM_ANDAMENTO,
    description: 'dasdsad',
    isFavorite: false,
    date: new Date('5-15-2020')
  },
  {
    id: 3,
    title: 'Todo Three',
    status: StatusEnum.PENDENTE,
    description: 'dasdsad',
    isFavorite: false,
    date: new Date('6-15-2020')
  }
];
