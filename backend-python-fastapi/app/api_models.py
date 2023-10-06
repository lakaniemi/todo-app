from pydantic import BaseModel
from typing import List


# Todo


class TodoBase(BaseModel):
    name: str
    is_completed: bool
    todo_list_id: int


class TodoCreate(TodoBase):
    pass


class Todo(TodoBase):
    id: int

    class Config:
        orm_mode = True


# Todo list


class TodoListBase(BaseModel):
    name: str


class TodoListCreate(TodoListBase):
    pass


class TodoList(TodoListBase):
    id: int
    todos: List[Todo]

    class Config:
        orm_mode = True
