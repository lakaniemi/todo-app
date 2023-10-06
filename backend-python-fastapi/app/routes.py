from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from .database import get_session
from . import api_models, db_queries
from .db_queries import NotFoundException

todo_list_router = APIRouter(
    prefix="/todo-lists",
    tags=["Todo list"],
    responses={404: {"description": "Not found"}},
)

todo_router = APIRouter(
    prefix="/todos",
    tags=["Todo"],
    responses={404: {"description": "Not found"}},
)


# Todo lists


@todo_list_router.get("/", response_model=List[api_models.TodoList])
async def get_todo_lists(session: AsyncSession = Depends(get_session)):
    return await db_queries.get_todo_lists(session)


@todo_list_router.get("/{list_id}", response_model=api_models.TodoList)
async def get_todo_list(list_id: int, session: AsyncSession = Depends(get_session)):
    todo_list = await db_queries.get_todo_list_by_id(list_id, session)
    if todo_list is None:
        raise HTTPException(
            status_code=404, detail=f"List with id '{list_id}' was not found"
        )
    return todo_list


@todo_list_router.post("/", response_model=api_models.TodoList)
async def create_todo_list(
    todo_list: api_models.TodoListCreate, session: AsyncSession = Depends(get_session)
):
    return await db_queries.create_todo_list(todo_list, session)


@todo_list_router.put("/{list_id}", response_model=api_models.TodoList)
async def update_todo_list(
    list_id: int,
    updated_fields: api_models.TodoListCreate,
    session: AsyncSession = Depends(get_session),
):
    try:
        return await db_queries.update_todo_list(list_id, updated_fields, session)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=e.message)


@todo_list_router.delete("/{list_id}", status_code=204)
async def delete_todo_list(list_id: int, session: AsyncSession = Depends(get_session)):
    try:
        return await db_queries.delete_todo_list(list_id, session)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=e.message)


# Todos


@todo_router.get("/", response_model=List[api_models.Todo])
async def get_todos(session: AsyncSession = Depends(get_session)):
    return await db_queries.get_todos(session)


@todo_router.get("/{id}", response_model=api_models.Todo)
async def get_todo(id: int, session: AsyncSession = Depends(get_session)):
    todo = await db_queries.get_todo_by_id(id, session)
    if todo is None:
        raise HTTPException(
            status_code=404, detail=f"Todo with id '{id}' was not found"
        )
    return todo


@todo_router.post("/", response_model=api_models.Todo)
async def create_todo(
    todo: api_models.TodoCreate, session: AsyncSession = Depends(get_session)
):
    try:
        return await db_queries.create_todo(todo, session)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=e.message)


@todo_router.put("/{id}", response_model=api_models.Todo)
async def update_todo(
    id: int, todo: api_models.TodoCreate, session: AsyncSession = Depends(get_session)
):
    try:
        return await db_queries.update_todo(id, todo, session)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=e.message)


@todo_router.delete("/{id}", status_code=204)
async def delete_todo(id: int, session: AsyncSession = Depends(get_session)):
    try:
        return await db_queries.delete_todo(id, session)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=e.message)
