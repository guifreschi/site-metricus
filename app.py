from flask import Flask, jsonify, request, render_template, session, redirect
from utilities.operations import get_datas, simple_conversion, complex_conversion
import config
from Metricus.utilities.pretty_response import PrettyResponse
from database import db
from models.history import History
import uuid
from utilities.tasks import schedule_data_deletion

app = Flask(__name__)
app.secret_key = config.SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI

db.init_app(app)

@app.route('/', methods=["GET"])
def home_page():
  return render_template('index.html')

@app.route('/conversion', methods=["POST"])
def conversion_page_post():
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

if __name__ == '__main__':
  app.run(debug=True)
