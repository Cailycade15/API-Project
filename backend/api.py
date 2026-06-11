from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from enum import Enum
import sqlite3


app = FastAPI()

DB_NAME = "database.db"


# ---------- DATABASE ----------
def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            completed TEXT NOT NULL DEFAULT "not_started" 
                CHECK(completed IN ('not_started', 'in_progress', 'done'))
        )
    """)
    conn.commit()
    conn.close()


init_db()

# ---------- Enum ----------
class completed_status(str, Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    DONE = "done"


# ---------- MODELS ----------
class to_do(BaseModel):
    title: str
    description: str
    completed: completed_status = completed_status.NOT_STARTED




@app.get("/todos/")
def get_todos():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM todos")
    rows = cursor.fetchall()
    conn.close()

    return rows

