import { Button } from "./primitive/Button";
import { Todo as TodoType } from "../codecs";
import { useAppState } from "../state";

type Props = {
  todo: TodoType;
};

export const Todo: React.FC<Props> = ({ todo }) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { name, is_completed, todo_list_id } = todo;

  const updateTodo = useAppState((state) => state.updateTodo);
  const deleteTodo = useAppState((state) => state.deleteTodo);

  return (
    <li className="bg-slate-300 m-2 rounded-md flex gap-4">
      <div className="px-4 py-2 flex-grow">
        {name}
        <Button
          text="delete"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            deleteTodo(todo);
          }}
        />
      </div>
      <div className="p-2">
        <input
          className="w-6 h-6 rounded-md focus:ring-green-700 focus:bg-green-700 checked:focus:bg-green-700 checked:bg-green-500 checked:hover:bg-green-700"
          type="checkbox"
          checked={is_completed}
          onChange={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            updateTodo(todo.id, {
              name,
              todo_list_id,
              is_completed: !todo.is_completed,
            });
          }}
        />
      </div>
    </li>
  );
};
