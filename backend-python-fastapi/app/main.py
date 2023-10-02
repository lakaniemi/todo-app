import uvicorn
from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


# Entry point for "poetry run start"
def start():
    uvicorn.run("app.main:app", port=3000)


# Entry point for "poetry run dev"
def dev():
    uvicorn.run("app.main:app", port=3000, reload=True)
