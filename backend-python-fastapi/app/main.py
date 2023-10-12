from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import todo_list_router, todo_router

app = FastAPI(title="TODO App Backend", version="1.0.0")

app.include_router(todo_list_router)
app.include_router(todo_router)

# TODO: should probably make this configurable somewhere
allowed_origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
async def health():
    return {"ok": True}
