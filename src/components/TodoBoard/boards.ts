import { TodoType } from "../../models/todo.type";

export type Board = {
  id: string;
  title: string;
  tasks: TodoType[];
};

export const boards: Board[] = [
  {
    id: "1",
    title: "ToDo",
    tasks: [],
  },
  {
    id: "2",
    title: "Completed",
    tasks: [],
  },
];
