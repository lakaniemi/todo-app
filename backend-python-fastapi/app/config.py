from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    # Read environment variables from .env file if specified
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # use SQLite by default
    db_connection_string: str = "sqlite+aiosqlite:///database.db"

    # Should SQL queries be printed into console
    echo_sql_queries: bool = False


config = Config()
