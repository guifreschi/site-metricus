from flask import Flask, jsonify, request, render_template, session
from flask_socketio import SocketIO
from operations import get_datas
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
    print(datas)
    session['first_value'] = datas["first_value"]
    session['second_value'] = datas["second_value"]
    session['result_unit'] = datas["result_unit"]
    session['from_unit'] = datas["from_unit"]
    session['to_unit'] = datas["to_unit"]
    print(session['first_value'])
  return jsonify({'status': 'success'})  

@app.route('/conversion', methods=["GET"])
def conversion_page_get():
  first_value = session.get('first_value')
  second_value = session.get('second_value')
  result_unit = session.get('result_unit')
  from_unit = session.get('from_unit')
  to_unit = session.get('to_unit')

  print(first_value)
  
  return render_template(
    'conversion.html',
    first_value=first_value,
    second_value=second_value,
    result_unit=result_unit,
    from_unit=from_unit,
    to_unit=to_unit
  )

@socketio.on('connect')
def handle_connect():
  print('Client connected to the server.')

@socketio.on('disconnect')
def handle_disconnect():
  print('Client has disconnected to the server.')

if __name__ == '__main__':
  socketio.run(app, debug=True)
