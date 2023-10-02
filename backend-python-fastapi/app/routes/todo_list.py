from typing import List
from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select

from ..models import TodoListCreate, TodoListRead, TodoList
from ..database import engine

router = APIRouter(
    prefix="/todo-lists",
    tags=["Todo list"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[TodoListRead])
async def get_todo_lists():
    with Session(engine) as session:
        return session.exec(select(TodoList)).all()


@router.get("/{list_id}", response_model=TodoListRead)
async def get_todo_list(list_id: str):
    with Session(engine) as session:
        list = session.get(TodoList, list_id)
        if not list:
            raise HTTPException(
                status_code=404, detail=f"List with id '{list_id}' was not found"
            )
        print(list.todos)
        return list


@router.get("/{list_id}/todos")
async def get_todo_list_todos(list_id: str):
    return []


@router.post("/", response_model=TodoListRead)
async def create_todo_list(todo_list: TodoListCreate):
    with Session(engine) as session:
        db_todo_list = TodoList.from_orm(todo_list)
        session.add(db_todo_list)
        session.commit()
        session.refresh(db_todo_list)
        return db_todo_list


@router.put("/{list_id}")
async def update_todo_list(list_id: str):
    return []


@router.delete("/{list_id}")
async def delete_todo_list(list_id: str):
    return []
