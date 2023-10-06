from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import contains_eager
from sqlalchemy import select, update

from . import db_models, api_models


class NotFoundException(Exception):
    def __init__(self, message: str):
        self.message = message
        super(NotFoundException, self).__init__(message)


# This file is now written utilizing ORM mode as much as possible to keep
# consistency. To be honest, I would actually prefer raw SQL queries more, but
# it is what it is now :)


async def get_todo_lists(session: AsyncSession):
    query = await session.execute(select(db_models.TodoList))
    return query.scalars().all()


async def get_todo_list_by_id(id: int, session: AsyncSession):
    query = await session.execute(
        select(db_models.TodoList).where(db_models.TodoList.id == id)
    )
    return query.scalars().first()


async def create_todo_list(list: api_models.TodoListCreate, session: AsyncSession):
    db_todo_list = db_models.TodoList(**list.dict())
    session.add(db_todo_list)
    await session.commit()
    await session.refresh(db_todo_list)
    return db_todo_list


async def update_todo_list(
    id: int,
    updated_fields: api_models.TodoListCreate,
    session: AsyncSession,
):
    db_todo_list = await get_todo_list_by_id(id, session)

    if db_todo_list is None:
        raise NotFoundException(f"List with id '{id}' was not found")

    await session.execute(
        update(db_models.TodoList)
        .where(db_models.TodoList.id == id)
        .values(**updated_fields.dict())
    )

    await session.commit()
    await session.refresh(db_todo_list)
    return db_todo_list


async def delete_todo_list(id: int, session: AsyncSession):
    db_todo_list = await get_todo_list_by_id(id, session)

    if db_todo_list is None:
        raise NotFoundException(f"List with id '{id}' was not found")

    await session.delete(db_todo_list)
    await session.commit()
