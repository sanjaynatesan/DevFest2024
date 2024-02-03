import psycopg2
from flask import Flask, jsonify, request
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


@api.route('/dummy', methods=['POST', 'GET'])
def dummy():
    dummy_response = [
        {
            "artist": "Nicky Jam",
            "genres": [
                "latin hip hop",
                "reggaeton",
                "trap latino",
                "urbano latino"
            ],
            "title": "X (feat. Maluma & Ozuna) - Remix",
            "image": "https://i.scdn.co/image/ab67616d0000b27343ec4e5bf12be32fc0beaac2",
            "uri": "spotify:track:6JjPBQfI2Y8nIjnm65X6Pw",
            "weight": 5.158460415146735
        },
        {
            "artist": "Ozuna",
            "genres": [
                "puerto rican pop",
                "reggaeton",
                "trap latino",
                "urbano latino"
            ],
            "title": "Bebé",
            "image": "https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1",
            "uri": "spotify:track:0ulsRBiciReng91DhfVT9D",
            "weight": 4.720726046469784
        },
        {
            "artist": "Jay Chou",
            "genres": [
                "c-pop",
                "mandopop",
                "taiwan pop",
                "zhongguo feng"
            ],
            "title": "蒲公英的約定",
            "image": "https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1",
            "uri": "spotify:track:3JovAXFjc98TkksMfeyIMh",
            "weight": 2.884160497896886
        },
        {
            "artist": "Prince Royce",
            "genres": [
                "bachata",
                "latin hip hop",
                "latin pop",
                "urbano latino"
            ],
            "title": "Cosas de la Peda (feat. Gabito Ballesteros)",
            "image": "https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1",
            "uri": "spotify:track:1RzNRKntEk0KiQE4NFBKmc",
            "weight": 5.28964254738048
        },
        {
            "artist": "Romeo Santos",
            "genres": [
                "bachata",
                "latin hip hop",
                "latin pop",
                "urbano latino"
            ],
            "title": "Mi Santa (feat. Tomatito)",
            "image": "https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1",
            "uri": "spotify:track:4EbAftNM732UGLF8gmIIsX",
            "weight": 5.28964254738048
        },
        {
            "artist": "CNCO",
            "genres": [
                "boy band",
                "latin pop",
                "reggaeton",
                "urbano latino"
            ],
            "title": "Reggaetón Lento (Bailemos)",
            "image": "https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1",
            "uri": "spotify:track:3AEZUABDXNtecAOSC1qTfo",
            "weight": 4.556474012983767
        },
        {
            "artist": "Ozuna",
            "genres": [
                "puerto rican pop",
                "reggaeton",
                "trap latino",
                "urbano latino"
            ],
            "title": "Egoísta",
            "image": "https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1",
            "uri": "spotify:track:4X3CV9rXo3hQrkb0fzRAux",
            "weight": 4.720726046469784
        },
        {
            "artist": "Romeo Santos",
            "genres": [
                "bachata",
                "latin hip hop",
                "latin pop",
                "urbano latino"
            ],
            "title": "Eres Mía",
            "image": "https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1",
            "uri": "spotify:track:6I86RF3odBlcuZA9Vfjzeq",
            "weight": 5.28964254738048
        },
        {
            "artist": "Romeo Santos",
            "genres": [
                "bachata",
                "latin hip hop",
                "latin pop",
                "urbano latino"
            ],
            "title": "Amor Enterrado",
            "image": "https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1",
            "uri": "spotify:track:3cdTfwai1PtCGOd9DIBMNU",
            "weight": 5.28964254738048
        },
        {
            "artist": "Zacarias Ferreira",
            "genres": [
                "bachata",
                "bachata dominicana"
            ],
            "title": "Es Tan Difícil",
            "image": "https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1",
            "uri": "spotify:track:0Ihu6hcj4hrWVz22W3G10P",
            "weight": 2.5905292832732236
        }
    ]

    return dummy_response


@api.route('/submit', methods=['POST'])
def submit_feelings():
    try:
        data = request.get_json()
        feelings = data.get('feelings', [])
        print(f'Received feelings: {feelings}')
        return {'message': 'Good shit!'}
    except Exception as e:
        print(f'Error processing feelings: {str(e)}')
        return {'error': 'Failed to process feelings'}, 500


if __name__ == '__main__':
    api.run(debug=True, host='127.0.0.1', port=5000)
