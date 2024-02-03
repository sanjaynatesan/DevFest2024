from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import algorithms
import os
import psycopg2

api = Flask(__name__)
CORS(api)
# CORS(api, supports_credentials=True, resources={r"/*": {"origins": "*"}})
api.config['CORS_HEADERS'] = 'Content-Type'

# api.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
# api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

'''
CLIENT ID: 8dca5b067d01447db4b574af663fd0be
SECRET: 0b2741bd6f4947b5b911083c846da214
REDIRECT URI: http://localhost:5000/callback
'''


def get_database_connection():
    conn = psycopg2.connect(
        host="34.30.54.122",
        database="user-songs",
        user='kent',
        password='cookiecrew'
    )
    return conn

@api.route('/songemotion', methods=['POST', 'GET'])
def song_emotion():

    response_body = {
        "response": "Dawg I'm stimming"
    }

    return response_body


@api.route('/adduser', methods=['POST', 'GET'])
def add_user():
    print("Reached start")
    conn = get_database_connection()
    print("Connected")

    cur = conn.cursor()
    print("Cur established")

    
    data = request.get_json(force=True)
    print(data)
    username = data['username']
    display_name = data['display_name']

    # Check if the username already exists in the user_info table
    cur.execute("SELECT username FROM user_info WHERE username = %s", (username,))
    existing_username = cur.fetchone()

    if existing_username:
        cur.close()
        conn.close()
        return "Username already exists", 200
    
    cur.execute("INSERT INTO user_info (username, display_name) VALUES (%s, %s)", (username, display_name))
    conn.commit()
    cur.close()
    conn.close()

    return "User added", 200

@api.route('/recent', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True, origins='http://127.0.0.1:3000')
def recent():
    output = algorithms.rselect()
    response = jsonify(output)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Content-Type':'application/json", "*")
    return response


if __name__ == '__main__':
    api.run(debug=True, host='127.0.0.1', port=5000)
