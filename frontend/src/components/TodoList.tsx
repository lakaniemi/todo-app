import { useState } from "react";

import { Button } from "./elements/Button";
import { ContextMenu } from "./elements/ContextMenu";
import { SinglePropertyInput } from "./SinglePropertyInput";
import { Todo } from "./Todo";
import AddIcon from "../assets/icons/add.svg";
import DeleteIcon from "../assets/icons/delete.svg";
import EditIcon from "../assets/icons/edit.svg";
import { TodoList as TodoListType } from "../codecs";
import { useAppState } from "../state";

type Props = {
  list: TodoListType;
};

export const TodoList: React.FC<Props> = ({ list }) => {
  const deleteTodoList = useAppState((state) => state.deleteTodoList);
  const updateTodoList = useAppState((state) => state.updateTodoList);
  const createTodo = useAppState((state) => state.createTodo);

  const [isNewTodoInputOpen, setIsNewTodoInputOpen] = useState(false);
  const [isRenameListInputOpen, setIsRenameListInputOpen] = useState(false);

  const { name, todos } = list;

  return (
    <div className="bg-slate-100 rounded-md p-2 mb-4">
      <div className="mb-4 flex gap-8 items-center justify-between">
        {!isRenameListInputOpen ? (
          <h2 className="text-2xl">{name}</h2>
        ) : (
          <SinglePropertyInput
            label="New name for TODO list"
            className="flex-grow"
            initialValue={list.name}
            onSubmit={(newTodoListName) => {
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              updateTodoList(list.id, { name: newTodoListName });
              setIsRenameListInputOpen(false);
            }}
            onCancel={() => {
              setIsRenameListInputOpen(false);
            }}
          />
        )}
        <ContextMenu
          description={`Actions for todo list "${name}"`}
          items={[
            {
              title: "Rename list",
              icon: EditIcon,
              onClick: () => {
                setIsRenameListInputOpen(true);
              },
            },
            {
              title: "Delete list",
              icon: DeleteIcon,
              onClick: () => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                deleteTodoList(list.id);
              },
            },
          ]}
        />
      </div>
      <ul>
        {todos.map((todo) => (
          <Todo key={`todo-${todo.id}`} todo={todo} />
        ))}
      </ul>
      {!isNewTodoInputOpen ? (
        <Button
          icon={AddIcon}
          variant="naked"
          text="Add TODO"
          onClick={() => {
            setIsNewTodoInputOpen(true);
          }}
        />
      ) : (
        <SinglePropertyInput
          label="Description of new TODO item"
          onSubmit={(newTodoName) => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            createTodo({
              name: newTodoName,
              todo_list_id: list.id,
              is_completed: false,
            });
            setIsNewTodoInputOpen(false);
          }}
          onCancel={() => {
            setIsNewTodoInputOpen(false);
          }}
        />
      )}
    </div>
  );
};
