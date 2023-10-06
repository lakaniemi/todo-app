from fastapi import FastAPI

from .routes import todo_list_router, todo_router

app = FastAPI(title="TODO App Backend", version="1.0.0")

app.include_router(todo_list_router)
app.include_router(todo_router)


@app.get("/", include_in_schema=False)
async def health():
    return {"ok": True}
