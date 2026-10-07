from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


def create_database():
    connection = sqlite3.connect("students.db")

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL,
            dob TEXT NOT NULL,
            phone TEXT NOT NULL,
            course TEXT NOT NULL,
            gender TEXT NOT NULL
        )
    """)

    connection.commit()
    connection.close()


@app.route("/register", methods=["POST"])
def register_student():

    data = request.get_json()

    full_name = data.get("fullName")
    email = data.get("email")
    dob = data.get("dob")
    phone = data.get("phnumber")
    course = data.get("course")
    gender = data.get("gender")

    connection = sqlite3.connect("students.db")

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO students
        (full_name, email, dob, phone, course, gender)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (full_name, email, dob, phone, course, gender))

    connection.commit()
    connection.close()

    return jsonify({
        "success": True,
        "message": "Student registered successfully!"
    })

@app.route("/students", methods=["GET"])
def get_students():

    connection = sqlite3.connect("students.db")
    connection.row_factory = sqlite3.Row

    cursor = connection.cursor()

    cursor.execute("SELECT * FROM students")

    students = cursor.fetchall()

    connection.close()

    return jsonify([dict(student) for student in students])

if __name__ == "__main__":
    create_database()
    app.run(debug=True)

