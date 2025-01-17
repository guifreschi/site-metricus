from flask import Blueprint, render_template

sign_up_bp = Blueprint('sign_up', __name__)

@sign_up_bp.route('/', methods=["GET"])
def get_signup():
  return render_template('sign-up.html')
