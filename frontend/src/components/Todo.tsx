import { useState } from "react";

import { ContextMenu } from "./elements/ContextMenu";
import { SinglePropertyInput } from "./SinglePropertyInput";
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

  const [isEditing, setIsEditing] = useState(false);

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
              title: "Rename TODO",
              icon: EditIcon,
              onClick: () => {
                setIsEditing(true);
              },
            },
          ]}
        />
      </div>
      {!isEditing ? (
        <>
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
        </>
      ) : (
        <SinglePropertyInput
          label="New description for the TODO"
          className="flex-grow"
          initialValue={name}
          onSubmit={(newName) => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            updateTodo(todo.id, {
              name: newName,
              todo_list_id,
              is_completed: !todo.is_completed,
            });
            setIsEditing(false);
          }}
          onCancel={() => {
            setIsEditing(false);
          }}
        />
      )}
    </li>
  );
};
