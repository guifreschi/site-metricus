from sqlalchemy.sql import func
from src.main.database import db

class History(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.String(64))
  message = db.Column(db.String(155), nullable=False)
  simpleValue = db.Column(db.Float, nullable=True)
  simpleFromUnit = db.Column(db.String(50), nullable=True)
  simpleToUnit = db.Column(db.String(50), nullable=True)
  unit_name = db.Column(db.String(50), nullable=True)
  rounded_result = db.Column(db.Boolean, nullable=False)
  resultUnit = db.Column(db.String(50), nullable=True)
  fromUnitSelect = db.Column(db.String(50), nullable=True)
  toUnitSelect = db.Column(db.String(50), nullable=True)
  firstValue = db.Column(db.Float, nullable=True)
  secondValue = db.Column(db.Float, nullable=True)
  created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
