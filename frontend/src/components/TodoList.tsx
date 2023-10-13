import { v4 as uuidv4 } from "uuid";

import { Button } from "./primitive/Button";
import { Todo } from "./Todo";
import { TodoList as TodoListType } from "../codecs";
import { useAppState } from "../state";

type Props = {
  list: TodoListType;
};

export const TodoList: React.FC<Props> = ({ list }) => {
  const deleteTodoList = useAppState((state) => state.deleteTodoList);
  const updateTodoList = useAppState((state) => state.updateTodoList);

  const { name, todos } = list;

  return (
    <div className="bg-slate-100 rounded-md p-2 my-2">
      <div className="mb-4 flex gap-4 items-center">
        <h2 className="text-2xl">{name}</h2>
        <Button
          text="Delete"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            deleteTodoList(list.id);
          }}
        />
        <Button
          text="Update"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            updateTodoList(list.id, { name: uuidv4() });
          }}
        />
      </div>
      <ul>
        {todos.map((todo) => (
          <Todo
            key={`todo-${todo.id}`}
            name={todo.name}
            isCompleted={todo.is_completed}
            isEditing={false}
          />
        ))}
      </ul>
    </div>
  );
};
