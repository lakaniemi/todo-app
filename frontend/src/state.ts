import { create } from "zustand";

import {
  APIError,
  CreateTodoListBody,
  createTodoListEA,
  fetchTodoListsEA,
} from "./api";
import { TodoList } from "./codecs";

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
  createTodoList: (body: CreateTodoListBody) => Promise<void>;
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

  createTodoList: async (body) => {
    await createTodoListEA(body)
      .ifLeft((error) => {
        set((state) => ({ errors: [...state.errors, error] }));
      })
      .ifRight((todoList) => {
        set((state) => ({
          todoListsById: { ...state.todoListsById, [todoList.id]: todoList },
        }));
      });
  },
}));
