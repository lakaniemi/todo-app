from collections.abc import AsyncGenerator
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

sqlite_file_name = "database.db"
sqlite_url = f"sqlite+aiosqlite:///{sqlite_file_name}"
connect_args = {"check_same_thread": False}  # Needed only for SQLite

engine = create_async_engine(sqlite_url, echo=True, connect_args=connect_args)

AsyncSessionFactory = async_sessionmaker(bind=engine, autoflush=False, autocommit=False)


# Dependency for routes
async def get_session() -> AsyncGenerator:
    async with AsyncSessionFactory() as session:
        yield session
