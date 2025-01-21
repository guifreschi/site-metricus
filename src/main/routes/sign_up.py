from flask import Blueprint, render_template, session, request, jsonify
from src.main.models.user import User
import uuid
import bcrypt
from src.main.database import db

sign_up_bp = Blueprint('sign_up', __name__)

@sign_up_bp.route('/', methods=["GET"])
def get_signup():
  return render_template('sign-up.html')

@sign_up_bp.route('/', methods=["POST"])
def post_signup():
  data = request.get_json()
  user_id = str(uuid.uuid4())
  username = data.get("username")
  password = data.get("password")

  if not username:
    return jsonify({"message": "Invalid username!"}), 400
  
  if not password:
    return jsonify({"message": "Invalid password!"}), 400
  
  if len(password) < 6:
    return jsonify({"message": "Password must have at least 6 characters!"}), 400

  hashed_password = bcrypt.hashpw(str.encode(password), bcrypt.gensalt())

  user = User(user_id=user_id ,username=username, password=hashed_password)

  try:
    db.session.add(user)
    db.session.commit()
  except Exception as e:
    return jsonify({"message": f"Database error: {str(e)}"}), 500

  return jsonify({"message": "User created successfully."}), 201
