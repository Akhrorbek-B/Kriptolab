import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "KriptoLab"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key")
    
    # Placeholder for database URI
    # DATABASE_URL: str = "sqlite:///./database.sqlite"
    
    class Config:
        env_file = ".env"

settings = Settings()
