from flask import Blueprint, render_template, request, jsonify, session
from src.main.database import db
from src.main.models.history import History
import uuid

history_bp = Blueprint('history', __name__)

@history_bp.route('/conversion/history', methods=["GET"])
def history_page():
  return render_template('history.html')

@history_bp.route('/conversion/history/data', methods=["GET"])
def get_data():
  user_id = session['user_id']

  if 'user_id' not in session:
    session['user_id'] = str(uuid.uuid4())

  history_items = History.query.filter_by(user_id=user_id).order_by(History.created_at.desc()).limit(5).all()

  data = [
    {
      "id": item.id,
      "message": item.message,
      "user_id": item.user_id,
      "created_at": item.created_at.strftime('%Y-%m-%d %H:%M:%S')
    }
    for item in history_items
  ]

  return jsonify(data)


@history_bp.route('/conversion/history/delete', methods=["POST"])
def delete_history_item():
  data = request.get_json()

  if not data or 'id' not in data:
    return jsonify({"success": False, "message": "ID not provided"}), 400
  
  history_item = History.query.get(data['id'])

  if not history_item:
    return jsonify({"success": False, "message": "Item not found"}), 404
  
  if history_item.user_id != session.get('user_id'):
    return jsonify({"success": False, "message": "Unauthorized"}), 403
  
  try:
    db.session.delete(history_item)
    db.session.commit()
    return jsonify({"success": True, "message": "Item deleted successfully"})
  except Exception as e:
    db.session.rollback()
    return jsonify({"success": False, "message": f"Error deleting item: {str(e)}"}), 500

@history_bp.route('/conversion/history/clear', methods=["POST"])
def clear_history():
  if 'user_id' not in session:
    session['user_id'] = str(uuid.uuid4())

  user_id = session.get('user_id')

  try:
    History.query.filter_by(user_id=user_id).delete()
    db.session.commit()
    return jsonify({"success": True, "message": "History cleared successfully"})
  except Exception as e:
    db.session.rollback()
    return jsonify({"success": False, "message": f"Error clearing history: {str(e)}"}), 500
