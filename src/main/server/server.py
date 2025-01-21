from flask import Flask, render_template, session
import uuid
from src.utilities.config import SECRET_KEY, SQLALCHEMY_DATABASE_URI
from src.main.database import db
from src.main.routes.conversion import conversion_bp
from src.main.routes.calculator import calculator_bp
from src.main.routes.history import history_bp
from src.main.routes.login import login_bp
from src.main.routes.sign_up import sign_up_bp
from src.main.routes.error import error_bp
from src.main.models.user import User
from flask_login import LoginManager

app = Flask(__name__)
app.secret_key = SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI

login_manager = LoginManager()
login_manager.init_app(app)
db.init_app(app)

login_manager.login_view = 'login.login'

@login_manager.user_loader
def load_user(user_id):
  return User.query.get(user_id)

@app.route('/', methods=["GET"])
def home_page():
  return render_template('index.html')

app.register_blueprint(conversion_bp)
app.register_blueprint(calculator_bp)
app.register_blueprint(history_bp)
app.register_blueprint(login_bp, url_prefix='/login')
app.register_blueprint(sign_up_bp, url_prefix='/sign-up')
app.register_blueprint(error_bp)

if __name__ == '__main__':
  app.run(debug=True)
