from flask import Flask, jsonify, request, render_template, session, redirect
from utilities.operations import get_datas, simple_conversion, complex_conversion
import instance.config as config
from Metricus.utilities.pretty_response import PrettyResponse
from database import db
from models.history import History
import uuid
from utilities.tasks import schedule_data_deletion

app = Flask(__name__)
app.secret_key = config.SECRET_KEY
# app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI_LITE

db.init_app(app)

@app.route('/', methods=["GET"])
def home_page():
  if 'user_id' not in session:
    session['user_id'] = str(uuid.uuid4())
  return render_template('index.html')

@app.route('/conversion', methods=["POST"])
def conversion_page_post():
  if 'user_id' not in session:
    session['user_id'] = str(uuid.uuid4())
  data = request.get_json()
  clicked_id = data.get('clicked_id').replace('-', '_')  
  if clicked_id:
    print("CLICKED ID:", clicked_id)
    datas = get_datas(checked_id=clicked_id)  
    
    session['datas'] = datas
    return jsonify({'status': 'success'})
  
  return jsonify({'status': 'failed'})
      
@app.route('/conversion', methods=["GET"])
def conversion_page_get():
  if 'user_id' not in session:
    session['user_id'] = str(uuid.uuid4())
  return render_template('conversion.html')

@app.route('/conversion/calculator', methods=["GET"])
def calculator_page_get():
  datas = session.get('datas', None)

  if datas:
    print("Dados recuperados para a unidade:", datas)
    if datas.get('complex_operation', False):  
      page = 'calculator-complex.html'
    else:
      page = 'calculator.html'
  else:
    print("Unit not found")
    return redirect('/conversion')  
  
  response = render_template(page, datas=datas)

  session.pop('datas', None) 

  return response

@app.route('/conversion/calculator', methods=["POST"])
def calculator_page_post():
  data = request.get_json() 

  if not data:
    return jsonify({"success": False, "message": "No data provided"})

  simpleValue = data.get('simpleValue')
  simpleFromUnit = data.get('simpleFromUnit')
  simpleToUnit = data.get('simpleToUnit')
  unit_name = data.get('unitName')
  resultUnit = data.get('resultUnit')
  fromUnitSelect = data.get('fromUnitSelect')
  toUnitSelect = data.get('toUnitSelect')
  rounded_result = None

  if 'user_id' not in session:
    session['user_id'] = str(uuid.uuid4())
  
  schedule_data_deletion(session['user_id'], db, History)

  if any('rounded-result-true' in sublist for sublist in data.get('roundedResult', [])):
    rounded_result = True
  else:
    rounded_result = False

  try:
    simpleValue = float(simpleValue) if simpleValue else None
    firstValue = float(data.get('firstValue', '')) if data.get('firstValue') else None
    secondValue = float(data.get('secondValue', '')) if data.get('secondValue') else None
  except ValueError:
    return jsonify({"success": False, "message": "Invalid input values"})

  try:
      if 'calculate' in unit_name:
        result = complex_conversion(
          unit_name, firstValue=firstValue, secondValue=secondValue, 
          resultUnit=resultUnit, fromUnitSelect=fromUnitSelect, 
          toUnitSelect=toUnitSelect, rounded_result=rounded_result
        )
        simple_conversion_type = False
      else:
        result = simple_conversion(
          unit_name=unit_name, simpleValue=simpleValue, 
          simpleFromUnit=simpleFromUnit, simpleToUnit=simpleToUnit, 
          rounded_result=rounded_result
        )
        simple_conversion_type = True

  except Exception as e:
    print(f"Error during conversion: {e}")
    return jsonify({"success": False, "message": "Conversion error"})

  if result is None:
    return jsonify({"success": False, "message": "Error calculating result"})

  if simple_conversion_type:
      pretty_response = PrettyResponse.simple_string(
        value=simpleValue, from_unit=simpleFromUnit, to_unit=simpleToUnit, 
        result=result, rounded_result=rounded_result
      )
  else:
      pretty_response = PrettyResponse.complex_string(
        first_value=firstValue, first_unit=fromUnitSelect, 
        second_value=secondValue, second_unit=toUnitSelect, 
        result=result, rounded_result=rounded_result
      )

  print(pretty_response)

  history = History(
    message=pretty_response, simpleValue=simpleValue, 
    simpleFromUnit=simpleFromUnit, simpleToUnit=simpleToUnit, 
    unit_name=unit_name, rounded_result=rounded_result, 
    resultUnit=resultUnit, fromUnitSelect=fromUnitSelect, 
    toUnitSelect=toUnitSelect, firstValue=firstValue, secondValue=secondValue,
    user_id=session['user_id']
  )

  db.session.add(history)
  db.session.commit()

  return jsonify({"success": True, "message": str(result)})

@app.route('/conversion/history', methods=["GET"])
def history_page():
  return render_template('history.html')

@app.route('/conversion/history/data', methods=["GET"])
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


@app.route('/conversion/history/delete', methods=["POST"])
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

@app.route('/conversion/history/clear', methods=["POST"])
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

if __name__ == '__main__':
  app.run(debug=True)
