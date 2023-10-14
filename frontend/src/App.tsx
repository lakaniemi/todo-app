import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useShallow } from "zustand/react/shallow";

import { Button } from "./components/elements/Button";
import { TodoList } from "./components/TodoList";
import { useAppState } from "./state";

export const App = () => {
  const todoLists = useAppState(
    useShallow((state) => Object.values(state.todoListsById)),
  );
  const errors = useAppState((state) => state.errors);
  const fetchTodoLists = useAppState((state) => state.fetchTodoLists);
  const createTodoList = useAppState((state) => state.createTodoList);
  const clearErrors = useAppState((state) => state.clearErrors);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchTodoLists();
  }, [fetchTodoLists]);

  return (
    <div className="p-2">
      {errors.length > 0 && (
        <div className="border-2 border-red-600 bg-red-300 p-2">
          {errors.map((error) => (
            <div key={`error-${uuidv4()}`} className="py-1">
              {JSON.stringify(error)}
            </div>
          ))}
          <button
            className="bg-white px-4 py-1"
            type="button"
            onClick={() => {
              clearErrors();
            }}
          >
            Clear errors
          </button>
        </div>
      )}

      <header className="mb-8 flex align gap-4">
        <h1 className="text-4xl">Todo App</h1>
        <div>
          <Button
            text="New todo list"
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              createTodoList({ name: uuidv4() });
            }}
          />
        </div>
      </header>

      <main>
        {todoLists.map((todoList) => (
          <TodoList key={`list-${todoList.id}`} list={todoList} />
        ))}
      </main>
    </div>
  );
};
