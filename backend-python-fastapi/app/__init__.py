import uvicorn


# Entry point for "poetry run start"
def start():
    uvicorn.run("app.main:app", port=3000)


# Entry point for "poetry run dev"
def dev():
    uvicorn.run("app.main:app", port=3000, reload=True)
