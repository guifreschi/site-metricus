from flask import Blueprint, render_template, request, jsonify, session
from src.utilities.operations import simple_conversion, complex_conversion
from src.main.database import db
from src.main.models.history import History
from Metricus.utilities.pretty_response import PrettyResponse
import uuid
from src.utilities.tasks import schedule_data_deletion

calculator_bp = Blueprint('calculator', __name__)

@calculator_bp.route('/conversion/calculator', methods=["GET"])
def calculator_page_get():
  datas = session.get('datas', None)

  if datas:
    print("Dados recuperados para a unidade:", datas)
    if datas.get('complex_operation', False):  
      page = 'calculator-complex.html'
    else:
      page = 'calculator.html'
    response = render_template(page, datas=datas)

    return response
  else:
    print("Unit not found")
    return jsonify({'message': 'failed'}) 

@calculator_bp.route('/conversion/calculator', methods=["POST"])
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
