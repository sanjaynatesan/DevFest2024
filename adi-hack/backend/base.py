from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import algorithms

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


@api.route('/stim')
def my_profile():
    response_body = {
        "response": "Dawg I'm stimming"
    }

    return response_body


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
