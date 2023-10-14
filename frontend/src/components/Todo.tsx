import { v4 as uuidv4 } from "uuid";

import { ContextMenu } from "./elements/ContextMenu";
import DeleteIcon from "../assets/icons/delete.svg";
import EditIcon from "../assets/icons/edit.svg";
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
    <li className="bg-slate-300 my-2 rounded-md flex gap-2 items-center p-2">
      <div>
        <ContextMenu
          description={`Actions for todo item ${name}`}
          menuDirection="right"
          items={[
            {
              title: "Delete TODO",
              icon: DeleteIcon,
              onClick: () => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                deleteTodo(todo);
              },
            },
            {
              title: "Edit TODO",
              icon: EditIcon,
              onClick: () => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                updateTodo(todo.id, {
                  name: uuidv4(),
                  todo_list_id,
                  is_completed,
                });
              },
            },
          ]}
        />
      </div>
      <div className="flex-grow">{name}</div>
      <input
        className="block w-6 h-6 rounded-md focus:ring-green-700 focus:bg-green-700 checked:focus:bg-green-700 checked:bg-green-500 checked:hover:bg-green-700"
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
    </li>
  );
};
