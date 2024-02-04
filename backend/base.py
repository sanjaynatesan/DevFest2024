import psycopg2
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import requests
import sys

import spotipy
# import spotipy.util as util
from spotipy.oauth2 import SpotifyOAuth  # , SpotifyClientCredentials

import algorithms
import gemini
import re

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


CLIENT_ID = '516b7b9290614e308a2045dcadea221d'
CLIENT_SECRET = 'fd7eb0b96d234776964a531e4c3b48bd'
REDIRECT_URI = 'http://127.0.0.1:7777/callback'  # Make sure this matches your actual redirect URI

AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"

@api.route('/getUserInfo', methods=['GET'])
@cross_origin(supports_credentials=True, origins=['http://127.0.0.1:3000', 'http://localhost:3000'])
def getUserInfo():
    data = request.get_json(force=True)

    pass


# Additional route to handle the Spotify callback
@api.route('/callback', methods=['POST'])
@cross_origin(supports_credentials=True, origins=['http://127.0.0.1:3000', 'http://localhost:3000'])
def spotify_callback():
    # cid = '8dca5b067d01447db4b574af663fd0be'  # 412a5c5cfedd4d15b71c65b4610ad586
    # secret = '0b2741bd6f4947b5b911083c846da214'  # 0d20d831e837457abf4cf32276e2a940
    # redirect_uri = 'http://127.0.0.1:7777/callback'
    # username = '9tlgjm5tb8iivhwr525qopqu7'  # 11153510588

    # Authorization flow
    scope = 'user-read-recently-played user-library-read playlist-read-private user-read-private'
    # scope = 'user-read-recently-played' # 'user-top-read'
    # SCOPE = 'user-library-read user-top-read user-read-recently-played user-read-playback-state'
    # token = util.prompt_for_user_token(username, scope, client_id=cid, client_secret=secret, redirect_uri=redirect_uri)

    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=CLIENT_ID,
                                                   client_secret=CLIENT_SECRET,
                                                   redirect_uri=REDIRECT_URI,
                                                   scope=scope))

    access_token = request.json.get('access_token')

    print(access_token)

    user_info_url = "https://api.spotify.com/v1/me"
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get(user_info_url, headers=headers)

    if response.status_code == 200:
        user_data = response.json()
        conn = get_database_connection()
        cur = conn.cursor()

        username = user_data['id']
        display_name = user_data['display_name']

         # Check if the username already exists in the user_info table
        cur.execute("SELECT username FROM user_info WHERE username = %s", (username,))
        existing_username = cur.fetchone()

        if existing_username:
            print("User exists")
            cur.close()
            conn.close()
            user_info = {
                "username": username,
                "display_name": display_name,
                "new": False
            }   

            return jsonify(user_info)
        
        cur.execute("INSERT INTO user_info (username, display_name) VALUES (%s, %s)", (username, display_name))
        conn.commit()
        cur.close()
        conn.close()

        print("success")
        
        user_info = {
            "username": username,
            "display_name": display_name,
            "new": True
        }
        return jsonify(user_info), 200
        # return "User authenticated and added to the database successfully"
        # login_response = requests.post('http://127.0.0.1:5000/login', json={'username': user_data['id'], 'display_name': user_data['display_name']})
    return "Failed to authenticate user", 500


@api.route('/adduser', methods=['POST', 'GET'])
def add_user():
    conn = get_database_connection()
    cur = conn.cursor()

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
@cross_origin(supports_credentials=True, origins=['http://127.0.0.1:3000', 'http://localhost:3000'])
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
@cross_origin(supports_credentials=True, origins=['http://127.0.0.1:3000', 'http://localhost:3000'])
def submit_feelings():
    try:
        data = request.get_json()
        feelings = data.get('feelings', [])
        written_feelings = data.get('written_feelings', None)
        not_feelings = data.get('not_feelings', [])
        username = data.get('username', None)
        song_uri = data.get('song_uri', None)
        # print(f'Received username: {username}')
        # print(f'Received feelings: {feelings}')
        # print(f'Received written feelings: {written_feelings}')
        # print(f'Not feelings: {not_feelings}')

        conn = get_database_connection()
        curr = conn.cursor()

        curr.execute("SELECT emotion FROM user_songs WHERE username = %s", (username,))
        emotions_result = curr.fetchall()

        # Extract emotions from the result and concatenate into a string
        emotions_string = ', '.join(emotion[0] for emotion in emotions_result)

        # print(f'Emotions from user_songs: {emotions_string}')

        unique_emotions = ', '.join(set(re.split(r',\s|\s|,', emotions_string)))
        # print(f'Unique Emotions: {unique_emotions}')

        predefined_emotions = "jaded, excited, faithful, happy, wistful, salacious"

        # Take the set union of unique emotions and predefined emotions
        combined_emotions = ', '.join(set(re.split(r',\s|\s|,', unique_emotions)) | set(re.split(r',\s|\s|,', predefined_emotions)))
        # print(f'Combined Emotions: {combined_emotions}')

        list_emotions = [emotion.strip() for emotion in combined_emotions.split(",")]
        # print(list_emotions)

        written_analysis = []
        
        if len(written_feelings) > 0:
            try:
                written_analysis = ''.join(gemini.training_vertex(combined_emotions, written_feelings).splitlines()[-1:])
                written_analysis = written_analysis.lower()
                written_analysis = list(set(re.split(r',\s|\s|,', written_analysis)))
                written_analysis = written_analysis[-3:]
                # print(f'Written analysis: {written_analysis}')

                for emotion in written_analysis:
                    if emotion != "":
                        curr.execute("SELECT COUNT(*) FROM user_songs WHERE username = %s AND emotion = %s AND song_uri = %s", (username, emotion, song_uri))
                        count = curr.fetchone()[0]

                        if count == 0:
                            # If no such entry exists, insert a new row
                            curr.execute("INSERT INTO user_songs (username, emotion, reaction, song_uri) VALUES (%s, %s, %s, %s)",
                                         (username, emotion, True, song_uri))
                conn.commit()
            except Exception as e:
                written_analysis = []


        for emotion in feelings:
            if emotion != "":
                curr.execute("SELECT COUNT(*) FROM user_songs WHERE username = %s AND emotion = %s AND song_uri = %s", (username, emotion, song_uri))
                count = curr.fetchone()[0]

                if count == 0:
                    # If no such entry exists, insert a new row
                    curr.execute("INSERT INTO user_songs (username, emotion, reaction, song_uri) VALUES (%s, %s, %s, %s)",
                                 (username, emotion, True, song_uri))
                    
        for emotion in not_feelings:
            if emotion != "":
                if emotion not in written_analysis:
                    curr.execute("SELECT COUNT(*) FROM user_songs WHERE username = %s AND emotion = %s AND song_uri = %s", (username, emotion, song_uri))
                    count = curr.fetchone()[0]

                    if count == 0:
                        # If no such entry exists, insert a new row
                        curr.execute("INSERT INTO user_songs (username, emotion, reaction, song_uri) VALUES (%s, %s, %s, %s)",
                                    (username, emotion, False, song_uri))
        conn.commit()
        sys.stdout.flush()
        curr.close()
        conn.close()
        return {'message': 'Good shit!'}
    except Exception as e:
        print(f'Error processing feelings: {str(e)}')
        return {'error': 'Failed to process feelings'}, 500


@api.route('/presessionResultProcessing', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True, origins=['*'])
def presessionResultProcessing():
    try:
        data = request.get_json()
        # "Feeling good"
        inputType = data.get('inputType', 0) # 1
        username = data.get('username', None) # '9tlgjm5tb8iivhwr525qopqu7'
        # print(f'Received response: {response}')
        # print(f'Received input type: {inputType}')

        conn = get_database_connection()
        curr = conn.cursor()

        response = data.get('feelings', None) 

        # 0 is button, 1 is written
        if inputType == 1:
            response = data.get('written_feelings', []) 
            curr.execute("SELECT emotion FROM user_songs WHERE username = %s", (username,))
            emotions_result = curr.fetchall()

            # Extract emotions from the result and concatenate into a string
            emotions_string = ', '.join(emotion[0] for emotion in emotions_result)

            # print(f'Emotions from user_songs: {emotions_string}')

            unique_emotions = ', '.join(set(re.split(r',\s|\s|,', emotions_string)))
            # print(f'Unique Emotions: {unique_emotions}')

            # list_emotions = [emotion.strip() for emotion in unique_emotions.split(",")]
            # print(list_emotions)
            # process
            response = gemini.suggestions_vertex(unique_emotions, response)

        curr.execute("SELECT song_uri, reaction FROM user_songs WHERE username = %s AND emotion = %s", (username, response,))
        uri_reaction = curr.fetchall()

        print(uri_reaction)

        # uri_reaction_list = [(uri, reaction) for uri, reaction in uri_reaction if uri != ""]

        uri_reaction_list = []
        for uri, reaction in uri_reaction:
            if uri != "":
                uri_reaction_list.append((uri, reaction))

        print(uri_reaction_list)

        curr.close()
        conn.close()

        returnval = algorithms.get_recs(uri_reaction_list)
        print(returnval)

        to_return = {
            "album": returnval["album"]["name"],
            "artist": returnval["artists"][0]["name"],
            "title": returnval["name"],
            "song_uri": returnval["uri"],
            "image": returnval["album"]["images"][0]["url"],
            "feelings": response,
            "username": username
        }

        print(to_return)

        return to_return

    except Exception as e:
        print(f'Error processing result: {str(e)}')
        return {'error': 'Failed to process result'}, 500

@api.route('/retrain', methods=['POST'])
@cross_origin(supports_credentials=True, origins=['http://127.0.0.1:3000', 'http://localhost:3000'])
def retrain():
    data = request.get_json()

    song_uri = data.get('song_uri', None)
    username = data.get('username', None)
    reaction = data.get('reaction', True)
    response = data.get('emotion', None)
    print(data)

    conn = get_database_connection()
    curr = conn.cursor()

    curr.execute("SELECT COUNT(*) FROM user_songs WHERE username = %s AND emotion = %s AND song_uri = %s", (username, response, song_uri))
    count = curr.fetchone()[0]

    if count == 0:
        # If no such entry exists, insert a new row
        curr.execute("INSERT INTO user_songs (username, emotion, reaction, song_uri) VALUES (%s, %s, %s, %s)",
                    (username, response, reaction, song_uri))
        conn.commit()

    curr.close()
    conn.close()
    return {'OK': 200}

@api.route('/recommendation', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True, origins=['http://127.0.0.1:3000', 'http://localhost:3000'])
def recommendation():
    data = request.get_json(force=True)

    username = data.get('username', None) # '9tlgjm5tb8iivhwr525qopqu7'
    # print(f'Received response: {response}')
    # print(f'Received input type: {inputType}')

    conn = get_database_connection()
    curr = conn.cursor()

    response = data.get('emotion', None) 

    curr.execute("SELECT song_uri, reaction FROM user_songs WHERE username = %s AND emotion = %s", (username, response,))
    uri_reaction = curr.fetchall()

    print(uri_reaction)

    # uri_reaction_list = [(uri, reaction) for uri, reaction in uri_reaction if uri != ""]

    uri_reaction_list = []
    for uri, reaction in uri_reaction:
        if uri != "":
            uri_reaction_list.append((uri, reaction))

    print(uri_reaction_list)

    curr.close()
    conn.close()

    returnval = algorithms.get_recs(uri_reaction_list)
    print(returnval)

    to_return = {
        "album": returnval["album"]["name"],
        "artist": returnval["artists"][0]["name"],
        "title": returnval["name"],
        "song_uri": returnval["uri"],
        "image": returnval["album"]["images"][0]["url"],
        "emotion": response,
        "username": username
    }

    print(to_return)

    return to_return

@api.route('/enrich', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True, origins=['http://127.0.0.1:3000', 'http://localhost:3000'])
def enrich_playlist(sp, username, playlist_id, playlist_tracks):
    index = 0
    results = []
    
    while index < len(playlist_tracks):
        results += sp.user_playlist_add_tracks(username, playlist_id, tracks = playlist_tracks[index:index + 100])
        index += 100

if __name__ == '__main__':
    api.run(debug=True, host='127.0.0.1', port=5000)