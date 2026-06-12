from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from enum import Enum
import sqlite3


app = FastAPI()

# Список разрешенных сайтов откуда будут приниматься запросы
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Делаем для CORS чтобы был доступ к эндпоинтам у разрешенных сайтов
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # или ["*"] для всех (небезопасно для продакшена)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
class Todo_Model(BaseModel):
    title: str
    description: str
    completed: completed_status = completed_status.NOT_STARTED



@app.get("/")
def init():
    return "Start SERVER"

@app.get("/todos/")
def get_todos():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM todos")
    rows = cursor.fetchall()
    conn.close()

    return rows

@app.post("/add")
def add_todo(todo: Todo_Model):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO todos (title, description, completed) VALUES(?, ?, ?)",
        (todo.title, todo.description, todo.completed))

    conn.commit()
    conn.close()
    return "Add Succes"

@app.delete("/delete/{id}")
def delete_todo(id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM todos WHERE id = ?", (id,))

    conn.commit()
    conn.close()
    return "Delete Succes"


# Добавить несколько данных в БД
# def add_test_data():
#     conn = sqlite3.connect(DB_NAME)
#     cursor = conn.cursor()

#     todos = [
#         ("Купить продукты", "Молоко, хлеб, яйца", "not_started"),
#         ("Сделать проект", "Закончить backend на FastAPI", "in_progress"),
#         ("Потренироваться", "Сходить в зал", "done"),
#     ]

#     cursor.executemany(
#         "INSERT INTO todos (title, description, completed) VALUES (?, ?, ?)",
#         todos
#     )

#     conn.commit()
#     conn.close()

#     print("Данные добавлены!")

# add_test_data()