from typing import List
from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class Todo(Base):
    __tablename__ = "todo"

    id: Mapped[int] = mapped_column(primary_key=True)
    todo_list_id: Mapped[int] = mapped_column(ForeignKey("todo_list.id"))
    name: Mapped[str]
    is_completed: Mapped[bool] = mapped_column(default=False)


class TodoList(Base):
    __tablename__ = "todo_list"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    todos: Mapped[List[Todo]] = relationship(
        cascade="all, delete-orphan",
        # https://docs.sqlalchemy.org/en/20/orm/queryguide/relationships.html#relationship-loading-techniques
        lazy="selectin",
    )
