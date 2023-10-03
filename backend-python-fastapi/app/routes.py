from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from .database import get_session
from . import db_models, api_models

router = APIRouter(
    prefix="/todo-lists",
    tags=["Todo list"],
    responses={404: {"description": "Not found"}},
)

# TODO: maybe split queries into own file, queries.py so they can be reused.
# e.g. finding a list is relevant for adding a TODO inside it


@router.get("/", response_model=List[api_models.TodoList])
async def get_todo_lists(session: AsyncSession = Depends(get_session)):
    return (await session.execute(select(db_models.TodoList))).scalars().all()


@router.get("/{list_id}", response_model=api_models.TodoList)
async def get_todo_list(list_id: int, session: AsyncSession = Depends(get_session)):
    query = await session.execute(
        select(db_models.TodoList).filter(db_models.TodoList.id == list_id)
    )
    result = query.scalars().first()
    if result is None:
        raise HTTPException(
            status_code=404, detail=f"List with id '{list_id}' was not found"
        )
    return result


@router.post("/", response_model=api_models.TodoList)
async def create_todo_list(
    todo_list: api_models.TodoListCreate, session: AsyncSession = Depends(get_session)
):
    db_todo_list = db_models.TodoList(**todo_list.dict())
    session.add(db_todo_list)
    await session.commit()
    await session.refresh(db_todo_list)
    return db_todo_list
