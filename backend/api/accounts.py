from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from db import db
from models.People import People

accounts = Blueprint("accounts", __name__)


@accounts.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    person = People.get_person(email, password)
    access_token = create_access_token(identity=str(person.id), expires_delta=False)
    response = jsonify({"msg": "Login successful"})
    response.set_cookie('access_token_cookie', access_token, httponly=True)
    return response


@accounts.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    age = data.get("age")
    user_type = data.get("user_type")
    email = data.get("email")
    password = data.get("password")
    person = People.register_person(name, age, user_type, email, password)
    access_token = create_access_token(identity=str(person.id), expires_delta=False)
    response = jsonify({"msg": "Registration successful"})
    response.set_cookie('access_token_cookie', access_token, httponly=True)
    return response


@accounts.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    response = jsonify({"msg": "Logout successful"})
    response.set_cookie('access_token_cookie', "", expires=0)
    return response


@accounts.route("/check", methods=["POST"])
@jwt_required()
def check():
    return jsonify({"msg": "Access token is valid"})
