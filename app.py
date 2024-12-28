from flask import Flask, jsonify, request, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/', methods=["GET"])
def home_page():
  return render_template('index.html')

@app.route('/conversion', methods=["GET"])
def conversion_page():
  return render_template('conversion.html')

@socketio.on('connect')
def handle_connect():
  print('Client connected to the server.')

@socketio.on('disconnect')
def handle_disconnect():
  print('Client has disconnected to the server.')

if __name__ == '__main__':
  socketio.run(app, debug=True)
