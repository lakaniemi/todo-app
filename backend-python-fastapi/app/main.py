from fastapi import FastAPI

from .routes import router
from .database import engine

app = FastAPI()

app.include_router(router)


@app.get("/", include_in_schema=False)
async def health():
    return {"ok": True}
