from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from .database import get_session
from . import db_models, api_models, db_queries

router = APIRouter(
    prefix="/todo-lists",
    tags=["Todo list"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[api_models.TodoList])
async def get_todo_lists(session: AsyncSession = Depends(get_session)):
    return await db_queries.get_todo_lists(session)


@router.get("/{list_id}", response_model=api_models.TodoList)
async def get_todo_list(list_id: int, session: AsyncSession = Depends(get_session)):
    todo_list = await db_queries.get_todo_list_by_id(list_id, session)
    if todo_list is None:
        raise HTTPException(
            status_code=404, detail=f"List with id '{list_id}' was not found"
        )
    return todo_list


@router.post("/", response_model=api_models.TodoList)
async def create_todo_list(
    todo_list: api_models.TodoListCreate, session: AsyncSession = Depends(get_session)
):
    return await db_queries.create_todo_list(todo_list, session)


@router.put("/{list_id}", response_model=api_models.TodoList)
async def update_todo_list(
    list_id: int,
    updated_fields: api_models.TodoListCreate,
    session: AsyncSession = Depends(get_session),
):
    updated_list = await db_queries.update_todo_list(list_id, updated_fields, session)
    if updated_list is None:
        raise HTTPException(
            status_code=404, detail=f"List with id '{list_id}' was not found"
        )
    return updated_list


@router.delete("/", status_code=204)
async def delete_todo_list(list_id: int, session: AsyncSession = Depends(get_session)):
    todo_list = await db_queries.get_todo_list_by_id(list_id, session)
    if todo_list is None:
        raise HTTPException(
            status_code=404, detail=f"List with id '{list_id}' was not found"
        )
    await db_queries.delete_todo_list(todo_list, session)
