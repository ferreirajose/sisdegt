import { StatusEnum } from "../shared/enum/status";

export interface Todo {
  id: number;
  title: string;
  description: string
  status: StatusEnum;
  isFavorite: boolean;
  dateCreate: Date;
  dateConclusion:Date;
}

export type Item = Omit<Todo, "id"|"isFavorite">;

//  { title: string, description: string, status: StatusEnum, dateCreate: Date, dateConclusion: Date}
