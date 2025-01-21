from src.main.database import db
from flask_login import UserMixin
import uuid

class User(db.Model, UserMixin):
  __tablename__ = 'users'
  user_id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4())) 
  username = db.Column(db.String(80), nullable=False, unique=True)
  password = db.Column(db.String(80), nullable=False)
  history = db.relationship('History', backref='user', lazy=True, passive_deletes=True)

  def get_id(self):
    return self.user_id
  