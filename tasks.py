import threading
from database import db

def delete_user_data(user_id, db, History):
  from app import app 
  with app.app_context(): 
    History.query.filter_by(user_id=user_id).delete()  
    db.session.commit()
    print(f"User data for {user_id} deleted after 30 minutes.")

def schedule_data_deletion(user_id, db, History, expiration_time=30):
  timer = threading.Timer(expiration_time * 60, delete_user_data, [user_id, db, History])
  timer.start()
