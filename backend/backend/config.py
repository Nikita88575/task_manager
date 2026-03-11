from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_HOST: str = "db"
    POSTGRES_PORT: int = 5432

    DJANGO_SECRET_KEY: str
    DJANGO_DEBUG: bool = False

    DJANGO_ALLOWED_HOSTS: str
    DJANGO_CORS_ORIGINS: str

    model_config = SettingsConfigDict(env_file="../.env")

env = Settings()  # type: ignore[call-arg]