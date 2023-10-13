import { Todo } from "./Todo";
import EditIcon from "../assets/icons/edit.svg";
import { TodoList as TodoListType } from "../codecs";

type Props = {
  list: TodoListType;
};

export const TodoList: React.FC<Props> = ({ list }) => {
  const { name, todos } = list;

  return (
    <div className="bg-slate-100 rounded-md p-2 my-2">
      <div className="mb-4 flex gap-4 items-center">
        <h2 className="text-2xl">{name}</h2>
        <button className="p-1 w-6 h-6" type="button">
          <img src={EditIcon} alt="Edit list" />
        </button>
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
