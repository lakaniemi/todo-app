import { create } from "zustand";
import { TodoList } from "./codecs";
import { APIError, fetchTodoListsEA } from "./api";

type AppState = {
  // Instead of TodoList[] we want to store every list in key-value object to
  // optimize operations
  todoListsById: Record<string, TodoList>;

  // Just dump them here for now
  errors: APIError[];
};

type Actions = {
  clearErrors: () => void;
  fetchTodoLists: () => Promise<void>;
};

export const useAppState = create<AppState & Actions>((set) => ({
  todoListsById: {},
  errors: [],

  clearErrors: () => {
    set({ errors: [] });
  },

  fetchTodoLists: async () => {
    await fetchTodoListsEA()
      .ifLeft((error) => {
        set((state) => ({ errors: [...state.errors, error] }));
      })
      .ifRight((todoLists) => {
        set({
          todoListsById: todoLists.reduce(
            (result, todoList) => ({ ...result, [todoList.id]: todoList }),
            {},
          ),
        });
      })
      .run();
  },
}));
