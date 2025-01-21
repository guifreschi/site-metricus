from flask import Blueprint, render_template, request, jsonify
from flask_login import login_user, current_user, login_required, logout_user
from src.main.models.user import User
from src.main.database import db
import bcrypt

login_bp = Blueprint('login', __name__)

@login_bp.route('/', methods=["GET"])
def get_login():
  return render_template('login.html')

@login_bp.route('/', methods=["POST"])
def login():
  data = request.json
  username = data.get("username")
  password = data.get("password")

  if username and password:
    user = User.query.filter_by(username=username).first()
    if user and bcrypt.checkpw(str.encode(password), str.encode(user.password)):
      login_user(user)
      print(current_user.is_authenticated)
      return jsonify({"message": "Authentication completed successfully!"})
  
  return jsonify({"message": "Invalid credentials."}), 400

@login_bp.route('/logout', methods=["GET"])
@login_required
def logout():
  logout_user()
  return jsonify({"message": "Logout completed successfully1"})
