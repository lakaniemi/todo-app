/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import {
  APIError,
  CreateTodoListBody,
  createTodoListEA,
  deleteTodoListEA,
  fetchTodoListsEA,
  updateTodoListEA,
} from "./api";
import { TodoList } from "./codecs";

type AppState = {
  // Instead of TodoList[] we want to store every list in key-value object to
  // optimize operations
  todoListsById: Record<string, TodoList>;

  // Just dump them here for now
  errors: APIError[];

  clearErrors: () => void;
  fetchTodoLists: () => Promise<void>;
  createTodoList: (body: CreateTodoListBody) => Promise<void>;
  deleteTodoList: (id: TodoList["id"]) => Promise<void>;
  updateTodoList: (
    id: TodoList["id"],
    body: CreateTodoListBody,
  ) => Promise<void>;
};

export const useAppState = create(
  immer<AppState>((set) => ({
    todoListsById: {},
    errors: [],

    clearErrors: () => {
      set({ errors: [] });
    },

    fetchTodoLists: async () => {
      await fetchTodoListsEA()
        .ifLeft((error) => {
          set((state) => {
            state.errors.push(error);
          });
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
          set((state) => {
            state.errors.push(error);
          });
        })
        .ifRight((todoList) => {
          set((state) => {
            state.todoListsById[todoList.id] = todoList;
          });
        });
    },

    deleteTodoList: async (id: TodoList["id"]) => {
      await deleteTodoListEA(id)
        .ifLeft((error) => {
          set((state) => {
            state.errors.push(error);
          });
        })
        .ifRight(() => {
          set((state) => {
            delete state.todoListsById[id];
          });
        });
    },

    updateTodoList: async (id: TodoList["id"], body: CreateTodoListBody) => {
      await updateTodoListEA(id, body)
        .ifLeft((error) => {
          set((state) => {
            state.errors.push(error);
          });
        })
        .ifRight((todoList) => {
          set((state) => {
            state.todoListsById[todoList.id] = todoList;
          });
        });
    },
  })),
);
