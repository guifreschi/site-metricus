from flask import Flask, jsonify, request, render_template, session, redirect
from flask_socketio import SocketIO
from operations import get_datas, simple_conversion, complex_conversion
import config

app = Flask(__name__)
app.secret_key = config.SECRET_KEY

socketio = SocketIO(app)

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

  print(data)
  if data:
    simpleValue = data.get('simpleValue')
    simpleFromUnit = data.get('simpleFromUnit')
    simpleToUnit = data.get('simpleToUnit')
    unit_name = data.get('unitName')
    rounded_result = None

    resultUnit = data.get('resultUnit')
    fromUnitSelect = data.get('fromUnitSelect')
    toUnitSelect = data.get('toUnitSelect')

    try:
      simpleValue = float(simpleValue)  
    except ValueError:
      simpleValue = ''

    try:
      firstValue = float(data.get('firstValue'))
    except ValueError:
      firstValue = ''

    try:
      secondValue = float(data.get('secondValue'))
    except ValueError:
      secondValue = ''
    
    if any('rounded-result-true' in sublist for sublist in data.get('roundedResult', [])):
      rounded_result = True
    else:
      rounded_result = False
    
    print(simpleValue, simpleFromUnit, simpleToUnit, rounded_result, unit_name)
    if 'calculate' in unit_name:
      result = complex_conversion(unit_name, firstValue=firstValue, secondValue=secondValue, resultUnit=resultUnit, fromUnitSelect=fromUnitSelect, toUnitSelect=toUnitSelect, rounded_result=rounded_result)
    else:
      result = simple_conversion(unit_name=unit_name, simpleValue=simpleValue, simpleFromUnit=simpleFromUnit, simpleToUnit=simpleToUnit, rounded_result=rounded_result)
    return jsonify({"success": True, "message": f"{result}"})

@socketio.on('connect')
def handle_connect():
  print('Client connected to the server.')

@socketio.on('disconnect')
def handle_disconnect():
  print('Client has disconnected to the server.')

if __name__ == '__main__':
  socketio.run(app, debug=True)
