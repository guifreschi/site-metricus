from src.main.models.history import History
from src.main.database import db

def remove_old_items(user_id, limit=42):
  history_items = History.query.filter_by(user_id=user_id).order_by(History.created_at.desc()).all()

  if len(history_items) > limit:
    items_to_delete = history_items[limit:]
    
    for item in items_to_delete:
      db.session.delete(item)
        
    db.session.commit()
