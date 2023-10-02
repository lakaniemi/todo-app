from fastapi import FastAPI
from sqlmodel import SQLModel

from .routes import todo_list
from .routes import todo
from .database import engine

app = FastAPI()

app.include_router(todo_list.router)
app.include_router(todo.router)


@app.on_event("startup")
def on_startup():
    # Create DB tables on startup. Should use some kind of migration system such as
    # https://alembic.sqlalchemy.org/en/latest/ but for now this shall be enough.
    SQLModel.metadata.create_all(engine)
