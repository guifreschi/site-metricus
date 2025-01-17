from flask import Blueprint, render_template, request, jsonify, session
from src.utilities.operations import get_datas
import uuid

conversion_bp = Blueprint('conversion', __name__)

@conversion_bp.route('/conversion', methods=["GET"])
def conversion_page_get():
  if 'user_id' not in session:
    session['user_id'] = str(uuid.uuid4())
  return render_template('conversion.html')

@conversion_bp.route('/conversion', methods=["POST"])
def conversion_page_post():
  if 'user_id' not in session:
    session['user_id'] = str(uuid.uuid4())
  data = request.get_json()
  clicked_id = data.get('clicked_id').replace('-', '_')  
  if clicked_id:
    datas = get_datas(checked_id=clicked_id)  
    session['datas'] = datas
    return jsonify({'status': 'success'})
  return jsonify({'status': 'failed'})


