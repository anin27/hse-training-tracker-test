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
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            date TEXT NOT NULL,
            location TEXT NOT NULL,
            capacity INTEGER NOT NULL
        )
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_name TEXT NOT NULL,
            employee_id TEXT NOT NULL,
            department TEXT NOT NULL,
            training_event TEXT NOT NULL,
            status TEXT NOT NULL
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
    rows = conn.execute("SELECT * FROM training_events ORDER BY date ASC").fetchall()
    conn.close()

    events = []
    for row in rows:
        events.append(dict(row))

    return jsonify(events)


@app.route("/events", methods=["POST"])
def create_event():
    data = request.get_json()

    event_id = data.get("id", "").strip()
    title = data.get("title", "").strip()
    category = data.get("category", "").strip()
    date = data.get("date", "").strip()
    location = data.get("location", "").strip()
    capacity = data.get("capacity", "").strip()

    if not event_id or not title or not category or not date or not location or not capacity:
        return jsonify({"message": "Please fill in all event fields."}), 400

    conn = get_db_connection()

    existing_event = conn.execute(
        "SELECT * FROM training_events WHERE id = ?",
        (event_id,)
    ).fetchone()

    if existing_event:
        conn.close()
        return jsonify({"message": "An event with this ID already exists."}), 400

    conn.execute("""
        INSERT INTO training_events (id, title, category, date, location, capacity)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (event_id, title, category, date, location, capacity))

    conn.commit()
    conn.close()

    return jsonify({"message": "Event created successfully."})


@app.route("/events/<event_id>", methods=["PUT"])
def update_event(event_id):
    data = request.get_json()

    title = data.get("title", "").strip()
    category = data.get("category", "").strip()
    date = data.get("date", "").strip()
    location = data.get("location", "").strip()
    capacity = data.get("capacity", "").strip()

    if not title or not category or not date or not location or not capacity:
        return jsonify({"message": "Please fill in all event fields."}), 400

    conn = get_db_connection()

    existing_event = conn.execute(
        "SELECT * FROM training_events WHERE id = ?",
        (event_id,)
    ).fetchone()

    if not existing_event:
        conn.close()
        return jsonify({"message": "Event not found."}), 404

    conn.execute("""
        UPDATE training_events
        SET title = ?, category = ?, date = ?, location = ?, capacity = ?
        WHERE id = ?
    """, (title, category, date, location, capacity, event_id))

    conn.commit()
    conn.close()

    return jsonify({"message": "Event updated successfully."})


@app.route("/events/<event_id>", methods=["DELETE"])
def delete_event(event_id):
    conn = get_db_connection()

    conn.execute("DELETE FROM registrations WHERE training_event = ?", (event_id,))
    deleted = conn.execute("DELETE FROM training_events WHERE id = ?", (event_id,))

    conn.commit()
    conn.close()

    if deleted.rowcount == 0:
        return jsonify({"message": "Event not found."}), 404

    return jsonify({"message": "Event deleted successfully."})


@app.route("/registrations", methods=["GET"])
def get_registrations():
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM registrations ORDER BY id DESC").fetchall()
    conn.close()

    registrations = []
    for row in rows:
        registrations.append(dict(row))

    return jsonify(registrations)


@app.route("/registrations", methods=["POST"])
def create_registration():
    data = request.get_json()

    employee_name = data.get("employeeName", "").strip()
    employee_id = data.get("employeeId", "").strip()
    department = data.get("department", "").strip()
    training_event = data.get("trainingEvent", "").strip()
    status = data.get("status", "").strip()

    if not employee_name or not employee_id or not department or not training_event or not status:
        return jsonify({"message": "Please fill in all registration fields."}), 400

    conn = get_db_connection()

    event_exists = conn.execute(
        "SELECT * FROM training_events WHERE id = ?",
        (training_event,)
    ).fetchone()

    if not event_exists:
        conn.close()
        return jsonify({"message": "Selected training event does not exist."}), 400

    conn.execute("""
        INSERT INTO registrations (employee_name, employee_id, department, training_event, status)
        VALUES (?, ?, ?, ?, ?)
    """, (employee_name, employee_id, department, training_event, status))

    conn.commit()
    conn.close()

    return jsonify({"message": "Registration created successfully."})


@app.route("/registrations/<int:registration_id>", methods=["DELETE"])
def delete_registration(registration_id):
    conn = get_db_connection()

    deleted = conn.execute(
        "DELETE FROM registrations WHERE id = ?",
        (registration_id,)
    )

    conn.commit()
    conn.close()

    if deleted.rowcount == 0:
        return jsonify({"message": "Registration not found."}), 404

    return jsonify({"message": "Registration deleted successfully."})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
