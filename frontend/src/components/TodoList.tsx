import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "./elements/Button";
import { TextInput } from "./elements/TextInput";
import { Todo } from "./Todo";
import AddIcon from "../assets/icons/add.svg";
import CheckIcon from "../assets/icons/check.svg";
import CrossIcon from "../assets/icons/cross.svg";
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

  const [isTodoInputOpen, setIsTodoInputOpen] = useState(false);
  const [newTodoDescription, setNewTodoDescription] = useState("");

  const { name, todos } = list;

  return (
    <div className="bg-slate-100 rounded-md p-2 my-2">
      <div className="mb-4 flex gap-4 flex-row flex-wrap">
        <h2 className="text-2xl">{name}</h2>
        <div className="flex gap-2">
          <Button
            icon={EditIcon}
            text="Rename list"
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              updateTodoList(list.id, { name: uuidv4() });
            }}
          />
          <Button
            icon={DeleteIcon}
            variant="red"
            text="Delete list"
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              deleteTodoList(list.id);
            }}
          />
        </div>
      </div>
      <ul>
        {todos.map((todo) => (
          <Todo key={`todo-${todo.id}`} todo={todo} />
        ))}
      </ul>
      {!isTodoInputOpen ? (
        <Button
          icon={AddIcon}
          variant="naked"
          text="Add TODO"
          onClick={() => {
            setIsTodoInputOpen(true);
          }}
        />
      ) : (
        <form
          className="flex gap-2 flex-wrap"
          onSubmit={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            createTodo({
              name: newTodoDescription,
              is_completed: false,
              todo_list_id: list.id,
            });
            setIsTodoInputOpen(false);
            setNewTodoDescription("");
          }}
          onReset={() => {
            setIsTodoInputOpen(false);
            setNewTodoDescription("");
          }}
        >
          <TextInput
            autoFocus
            label="TODO item description"
            className="flex-grow min-w-[16rem]"
            onChange={(e) => {
              setNewTodoDescription(e.target.value);
            }}
          />
          <div className="flex gap-1">
            <Button text="Add" variant="green" icon={CheckIcon} type="submit" />
            <Button text="Cancel" variant="red" icon={CrossIcon} type="reset" />
          </div>
        </form>
      )}
    </div>
  );
};
