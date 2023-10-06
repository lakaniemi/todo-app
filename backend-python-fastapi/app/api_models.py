from pydantic import BaseModel, Field
from typing import List


# Todo


class TodoBase(BaseModel):
    name: str = Field(examples=["Buy milk"])
    is_completed: bool = Field(default=False)
    todo_list_id: int


class TodoCreate(TodoBase):
    pass


class Todo(TodoBase):
    id: int

    class Config:
        from_attributes = True


# Todo list


class TodoListBase(BaseModel):
    name: str = Field(examples=["Groceries"])


class TodoListCreate(TodoListBase):
    pass


class TodoList(TodoListBase):
    id: int
    todos: List[Todo]

    class Config:
        from_attributes = True
