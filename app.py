from flask import Flask, render_template, jsonify, request
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


@app.route("/events", methods=["GET"])
def get_events():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM training_events").fetchall()
    conn.close()

    events = []

    for row in rows:
        events.append(dict(row))

    return jsonify(events)


@app.route("/events", methods=["POST"])
def save_event():
    data = request.get_json()

    event_id = data["id"]
    title = data["title"]
    category = data["category"]
    date = data["date"]
    location = data["location"]
    capacity = data["capacity"]

    conn = get_db_connection()

    old_event = conn.execute(
        "SELECT * FROM training_events WHERE id = ?",
        (event_id,)
    ).fetchone()

    if old_event is None:
        conn.execute("""
            INSERT INTO training_events (id, title, category, date, location, capacity)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (event_id, title, category, date, location, capacity))
    else:
        conn.execute("""
            UPDATE training_events
            SET title = ?, category = ?, date = ?, location = ?, capacity = ?
            WHERE id = ?
        """, (title, category, date, location, capacity, event_id))

    conn.commit()
    conn.close()

    return jsonify({"message": "Event saved successfully"})


@app.route("/events/<event_id>", methods=["DELETE"])
def delete_event(event_id):
    conn = get_db_connection()
    conn.execute("DELETE FROM training_events WHERE id = ?", (event_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Event deleted successfully"})


@app.route("/registrations", methods=["GET"])
def get_registrations():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM registrations").fetchall()
    conn.close()

    registrations = []

    for row in rows:
        registrations.append(dict(row))

    return jsonify(registrations)


@app.route("/registrations", methods=["POST"])
def save_registration():
    data = request.get_json()

    employee_name = data["employeeName"]
    employee_id = data["employeeId"]
    department = data["department"]
    training_event = data["trainingEvent"]
    status = data["status"]

    conn = get_db_connection()
    conn.execute("""
        INSERT INTO registrations (employee_name, employee_id, department, training_event, status)
        VALUES (?, ?, ?, ?, ?)
    """, (employee_name, employee_id, department, training_event, status))

    conn.commit()
    conn.close()

    return jsonify({"message": "Registration saved successfully"})


@app.route("/registrations/<int:registration_id>", methods=["DELETE"])
def delete_registration(registration_id):
    conn = get_db_connection()
    conn.execute("DELETE FROM registrations WHERE id = ?", (registration_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Registration removed successfully"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)