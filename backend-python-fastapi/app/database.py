from collections.abc import AsyncGenerator
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from .config import config


engine = create_async_engine(config.db_connection_string, echo=config.echo_sql_queries)

AsyncSessionFactory = async_sessionmaker(bind=engine, autoflush=False, autocommit=False)


# Dependency for routes
async def get_session() -> AsyncGenerator:
    async with AsyncSessionFactory() as session:
        yield session
