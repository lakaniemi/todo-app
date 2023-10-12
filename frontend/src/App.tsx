import { TodoList } from "./components/TodoList";

export const App = () => {
  return (
    <div className="p-2">
      <h1 className="text-4xl mb-4">Todo App</h1>

      <TodoList name="Testilista" />
    </div>
  );
};
