from flask import Blueprint, render_template, request, jsonify, session
from src.main.database import db
from src.main.models.history import History
from flask_login import login_required, current_user
from src.utilities.tasks import remove_old_items

history_bp = Blueprint('history', __name__)

@history_bp.route('/conversion/history', methods=["GET"])
@login_required
def history_page():
  return render_template('history.html')

@history_bp.route('/conversion/history/data', methods=["GET"])
@login_required
def get_data():
    user_id = current_user.get_id()
    page = request.args.get('page', 1, type=int)  
    per_page = request.args.get('limit', 7, type=int)  

    remove_old_items(user_id, limit=42)

    history_query = History.query.filter_by(user_id=user_id).order_by(History.created_at.desc())
    total_items = history_query.count()
    history_items = history_query.offset((page - 1) * per_page).limit(per_page).all()

    data = [
        {
            "id": item.id,
            "message": item.message,
            "user_id": item.user_id,
            "created_at": item.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
        for item in history_items
    ]

    return jsonify({
        "data": data,
        "total_items": total_items,
        "page": page,
        "total_pages": (total_items + per_page - 1) // per_page
    })

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
