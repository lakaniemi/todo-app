# Backend (Python + FastAPI)

## Requirements

- Python 3.12 (consider using tool like [pyenv](https://github.com/pyenv/pyenv))
  - If using pyenv, remember to install [Python build dependencies](https://github.com/pyenv/pyenv/wiki#suggested-build-environment)
- [Poetry](https://github.com/python-poetry/poetry) package manager (v1.6.1)
  - Install through e.g. `pipx`: `pipx install poetry==1.6.1`

## Development

```bash
# Install dependencies
poetry install

# Run server in dev mode. Also remember to run migrations before this (see below!)
poetry run dev
```

## Migrations

```bash
# Assuming that "poetry install" is already run

# Activate venv
poetry shell

# Run migrations
DB_URL=sqlite:///database.db alembic upgrade head

# Create new migration
alembic revision -m "migration name"

# For automatic generation based on model changes, use
DB_URL=sqlite:///database.db alembic revision --autogenerate -m "migration name"
```
