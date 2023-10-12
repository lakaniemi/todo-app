import { GetType, array, boolean, number, string } from "purify-ts";
import { Interface } from "purify-ts-extra-codec";

export const TodoCodec = Interface({
  id: number,
  todo_list_id: number,
  is_completed: boolean,
  name: string,
});

export type Todo = GetType<typeof TodoCodec>;

export const TodoListCodec = Interface({
  id: number,
  name: string,
  todos: array(TodoCodec),
});

export type TodoList = GetType<typeof TodoListCodec>;
