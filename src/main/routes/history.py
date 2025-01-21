from flask import Blueprint, render_template, request, jsonify, session
from src.main.database import db
from src.main.models.history import History
from flask_login import login_required, current_user

history_bp = Blueprint('history', __name__)

@history_bp.route('/conversion/history', methods=["GET"])
@login_required
def history_page():
  return render_template('history.html')

@history_bp.route('/conversion/history/data', methods=["GET"])
@login_required
def get_data():
  user_id = current_user.get_id()

  history_items = History.query.filter_by(user_id=user_id).order_by(History.created_at.desc()).limit(50).all()

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


@history_bp.route('/conversion/history/delete', methods=["DELETE"])
@login_required
def delete_history_item():
  data = request.get_json()
  user_id = current_user.get_id()

  if not data or 'id' not in data:
    return jsonify({"success": False, "message": "ID not provided"}), 400
  
  history_item = History.query.get(data['id'])

  if not history_item:
    return jsonify({"success": False, "message": "Item not found"}), 404
  
  if history_item.user_id != user_id:
    return jsonify({"success": False, "message": "Unauthorized"}), 403
  
  try:
    db.session.delete(history_item)
    db.session.commit()
    return jsonify({"success": True, "message": "Item deleted successfully"})
  except Exception as e:
    db.session.rollback()
    return jsonify({"success": False, "message": f"Error deleting item: {str(e)}"}), 500

@history_bp.route('/conversion/history/clear', methods=["DELETE"])
@login_required
def clear_history():
  user_id = current_user.get_id()
  try:
    History.query.filter_by(user_id=user_id).delete()
    db.session.commit()
    return jsonify({"success": True, "message": "History cleared successfully"})
  except Exception as e:
    db.session.rollback()
    return jsonify({"success": False, "message": f"Error clearing history: {str(e)}"}), 500
