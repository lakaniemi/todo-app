import {
  Codec,
  GetType,
  Right,
  array,
  boolean,
  number,
  string,
} from "purify-ts";
import { Interface } from "purify-ts-extra-codec";

// Codec that accepts everything and return undefined. Used for API requests that
// we don't expect a body to return.
export const ReturnUndefinedCodec = Codec.custom<undefined>({
  decode: () => Right(undefined),
  encode: () => Right(undefined),
});

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
