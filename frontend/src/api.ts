import { Codec, Either, EitherAsync, Left, array } from "purify-ts";

import { TodoList, TodoListCodec } from "./codecs";

export enum APIErrorType {
  Unexpected = "unexpected",
  Validation = "validation",
}

export type APIError = {
  type: APIErrorType;
  context: unknown;
};

// .json() does not necessarily return JSON, so the result could be basically
// anything parseable by JSON.parse(), see:
// https://developer.mozilla.org/en-US/docs/Web/API/Request/json
// Thus, at this point "unknown" is the best we know
const jsonOrText = async (response: Response): Promise<unknown> => {
  try {
    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      return await response.text();
    }

    return await (response.json() as Promise<unknown>);
  } catch (e) {
    return `Failed to parse ${JSON.stringify(e)}`;
  }
};

type APIRequestOptions = {
  method?: string;
  body?: Record<string, unknown>;
};

export const apiRequest = async <T>(
  path: string,
  codec: Codec<T>,
  options: APIRequestOptions = {},
): Promise<Either<APIError, T>> => {
  try {
    const url = new URL(path, import.meta.env.VITE_BACKEND_URL || "");
    const { method, body } = options;
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await jsonOrText(response);
      return Left({
        type: APIErrorType.Unexpected,
        context: error,
      } satisfies APIError);
    }

    const responseBody = await jsonOrText(response);
    return codec.decode(responseBody).mapLeft((codecError) => ({
      type: APIErrorType.Validation,
      context: codecError,
    }));
  } catch (error) {
    return Left({
      type: APIErrorType.Unexpected,
      context: error instanceof Error ? error.message : error,
    } satisfies APIError);
  }
};

export const fetchTodoListsEA = () =>
  EitherAsync.fromPromise(() =>
    apiRequest("/todo-lists", array(TodoListCodec)),
  );

export type CreateTodoListBody = Pick<TodoList, "name">;

export const createTodoListEA = (body: CreateTodoListBody) =>
  EitherAsync.fromPromise(() =>
    apiRequest("/todo-lists", TodoListCodec, { method: "POST", body }),
  );
