from flask import Blueprint, request, jsonify
from db import db
from models.People import People

accounts = Blueprint("accounts", __name__)

@accounts.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    person = People.get_person(email, password)
    return jsonify(person.to_json())

@accounts.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    age = data.get("age")
    user_type = data.get("user_type")
    email = data.get("email")
    password = data.get("password")
    person = People.register_person(name, age, user_type, email, password)
    return jsonify(person.to_json())
