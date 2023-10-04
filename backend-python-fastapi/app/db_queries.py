from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, update

from . import db_models, api_models


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
    query = await session.execute(
        update(db_models.TodoList)
        .where(db_models.TodoList.id == id)
        .values(**updated_fields.dict())
    )

    # Query did not affect anything -> TodoList with given id was not found
    if query.rowcount == 0:
        return None

    await session.commit()

    # Get updated TodoList from database. Simpler way would have been to use
    # .returning(db_models.TodoList) in the end of query and then just returning
    # query.scalars().first(), but SQLite does not support RETURNING statement
    # and I want to keep SQLite compatibility for tests.
    return await get_todo_list_by_id(id, session)


async def delete_todo_list(db_list: db_models.TodoList, session: AsyncSession):
    await session.delete(db_list)
    await session.commit()
