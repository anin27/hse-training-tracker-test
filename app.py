from flask import Flask, render_template
import sqlite3

app = Flask(__name__)

DATABASE = "hse_tracker.db"


def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def create_tables():
    conn = get_db_connection()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS training_events (
            id TEXT PRIMARY KEY,
            title TEXT,
            category TEXT,
            date TEXT,
            location TEXT,
            capacity INTEGER
        )
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_name TEXT,
            employee_id TEXT,
            department TEXT,
            training_event TEXT,
            status TEXT
        )
    """)

    conn.commit()
    conn.close()


create_tables()


@app.route("/")
def training_events_page():
    return render_template("training_events.html")


@app.route("/registrations-page")
def registrations_page():
    return render_template("registrations.html")


if __name__ == "__main__":
    app.run(debug=True)