import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { TodoList } from "./components/TodoList";
import { useAppState } from "./state";

export const App = () => {
  const todoLists = useAppState((state) => state.todoListsById);
  const errors = useAppState((state) => state.errors);
  const fetchTodoLists = useAppState((state) => state.fetchTodoLists);
  const clearErrors = useAppState((state) => state.clearErrors);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchTodoLists();
  }, [fetchTodoLists]);

  console.log(Object.values(todoLists));

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
      <h1 className="text-4xl mb-4">Todo App</h1>

      <TodoList name="Testilista" />
    </div>
  );
};
