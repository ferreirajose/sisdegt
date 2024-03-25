import { StatusEnum } from "../shared/enum/status";

export interface Todo {
  id: number;
  title: string;
  description: string
  status: StatusEnum;
  isFavorite: boolean;
  date: Date;
}
