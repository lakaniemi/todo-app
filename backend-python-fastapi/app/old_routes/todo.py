from typing import List
from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select

from ..api_models import TodoCreate, TodoRead, Todo, TodoList
from ..database import engine

router = APIRouter(prefix="/todos", tags=["Todo"])


@router.get("/", response_model=List[TodoRead])
async def get_todos():
    with Session(engine) as session:
        return session.exec(select(Todo)).all()


@router.get("/{todo_id}", response_model=TodoRead)
async def get_todo(todo_id: str):
    with Session(engine) as session:
        todo = session.get(Todo, todo_id)
        if not todo:
            raise HTTPException(
                status_code=404, detail=f"TODO with id '{todo_id}' was not found"
            )
        return todo


@router.post("/", response_model=TodoRead)
async def create_todo(todo: TodoCreate):
    with Session(engine) as session:
        todo_list = session.get(TodoList, todo.todo_list_id)
        if not todo_list:
            raise HTTPException(
                status_code=404,
                detail=f"TODO list with id '{todo.todo_list_id}' was not found",
            )
        db_todo = Todo.from_orm(todo)
        session.add(db_todo)
        session.commit()
        session.refresh(db_todo)
        return db_todo


@router.put("/{todo_id}")
async def update_todo(todo_id: str):
    return []


@router.delete("/{todo_id}")
async def delete_todo(todo_id: str):
    return []
