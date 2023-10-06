from fastapi import FastAPI

from .routes import todo_list_router, todo_router
from .database import engine

app = FastAPI()

app.include_router(todo_list_router)
app.include_router(todo_router)


@app.get("/", include_in_schema=False)
async def health():
    return {"ok": True}
