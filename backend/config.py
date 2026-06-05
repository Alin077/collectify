from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
DATABASE_PATH = BASE_DIR / "collectify.db"
SECRET_KEY = "collectify-coursework-secret"
