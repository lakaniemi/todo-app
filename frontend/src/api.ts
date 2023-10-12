import { Codec, Either, EitherAsync, Left, array } from "purify-ts";
import { TodoListCodec } from "./codecs";

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

export const apiRequest = async <T>(
  path: string,
  codec: Codec<T>,
  options?: RequestInit,
): Promise<Either<APIError, T>> => {
  try {
    const url = new URL(path, import.meta.env.VITE_BACKEND_URL || "");

    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await jsonOrText(response);
      return Left({
        type: APIErrorType.Unexpected,
        context: error,
      } satisfies APIError);
    }

    const body = await jsonOrText(response);
    return codec.decode(body).mapLeft((codecError) => ({
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
