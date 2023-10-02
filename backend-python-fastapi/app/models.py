from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

# I would've liked to separate these to their own files too (similarly to routes)
# but circular import issues became too severe, and I don't want to focus my energy
# on resolving them at the moment. This shall do :)

# Todo list


class TodoListBase(SQLModel):
    __tablename__: str = "todo_list"

    name: str
    # Weird type, but apparently the way to go:
    # https://sqlmodel.tiangolo.com/tutorial/relationship-attributes/type-annotation-strings/#about-the-string-in-listhero
    todos: List["Todo"] = Relationship(back_populates="todo_list")


class TodoList(TodoListBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class TodoListCreate(TodoListBase):
    pass


class TodoListRead(TodoListBase):
    id: int


# Todo


class TodoBase(SQLModel):
    name: str
    completed: bool = Field(default=False)
    todo_list_id: int = Field(foreign_key="todo_list.id")


class Todo(TodoBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class TodoCreate(TodoBase):
    pass


class TodoRead(TodoBase):
    id: int
