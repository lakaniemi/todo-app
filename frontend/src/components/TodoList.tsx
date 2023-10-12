import { Todo } from "./Todo";
import EditIcon from "../assets/icons/edit.svg";

type Props = {
  name: string;
};

export const TodoList: React.FC<Props> = ({ name }) => {
  const todos = [
    { id: 1, name: "Testi todo", isCompleted: false },
    { id: 2, name: "Testi todo 2", isCompleted: true },
    { id: 3, name: "Testi todo 3", isCompleted: false },
    { id: 4, name: "Testi todo 4", isCompleted: false },
  ];

  return (
    <div className="bg-slate-100 rounded-md p-2">
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
            isCompleted={todo.isCompleted}
            isEditing={false}
          />
        ))}
      </ul>
    </div>
  );
};
