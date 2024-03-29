import pandas as pd
import numpy as np
import random
import math
import spotipy
from spotipy.oauth2 import SpotifyOAuth #, SpotifyClientCredentials
from sklearn.svm import SVC
from sklearn.mixture import GaussianMixture
from sklearn.metrics import pairwise_distances

# Declare the credentials
cid = '516b7b9290614e308a2045dcadea221d' #'8dca5b067d01447db4b574af663fd0be' # 412a5c5cfedd4d15b71c65b4610ad586
secret = 'fd7eb0b96d234776964a531e4c3b48bd' #'0b2741bd6f4947b5b911083c846da214' # 0d20d831e837457abf4cf32276e2a940
redirect_uri='http://127.0.0.1:7777/callback'
username = '9tlgjm5tb8iivhwr525qopqu7' # 11153510588

# Authorization flow
scope = 'user-read-recently-played user-library-read playlist-read-private user-read-private'
# scope = 'user-read-recently-played' # 'user-top-read'
# SCOPE = 'user-library-read user-top-read user-read-recently-played user-read-playback-state'
# token = util.prompt_for_user_token(username, scope, client_id=cid, client_secret=secret, redirect_uri=redirect_uri)

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=cid,
                                                client_secret=secret,
                                                redirect_uri=redirect_uri,
                                                scope=scope))


def rselect():
    # Get the most recently played tracks
    results = sp.current_user_recently_played()

    songs = []

    artist_ids = []
    for track in results['items']:
        artist_ids.append(track["track"]["artists"][0]["external_urls"]["spotify"])

    artists = sp.artists(artist_ids)['artists']
    # pointer = 0
    # for track in results['items']:
        # artist = sp.artist(track["track"]["artists"][0]["external_urls"]["spotify"])
    # print(artists)
    for index, artist in enumerate(artists):
        # print(index, artist)
        track_info = {
            'title': results['items'][index]['track']['name'],
            'artist':  results['items'][index]["track"]["artists"][0]['name'],
            'album': results['items'][index]['track']['album']['name'],
            'genres': artist['genres'],
            'image': results['items'][index]['track']['album']['images'][0]['url'],
            'uri':  results['items'][index]['track']['uri'],
            'weight': 0,
        }
        if track_info in songs: 
            continue
        songs.append(track_info)

    # Shuffle the list to add randomness
    random.shuffle(songs)

    # Count occurrences of each genre
    genre_counts = {}
    for song in songs:
        for genre in song["genres"]:
            genre_counts[genre] = genre_counts.get(genre, 0) + 1

    # Calculate weights for each song based on log count of occurrences
    for song in songs:
        num_genres = len(song["genres"])
        song["weight"] = sum(math.log(genre_counts[genre] + 1) / math.sqrt(num_genres) for genre in song["genres"])

    selected_song_titles = set()
    # Choose 10 songs with weighted selection
    selected_songs = []
    count = 0
    while len(selected_songs) < 10:
        song = random.choices(songs, weights=[song["weight"] for song in songs], k=1)[0]
        if song["title"] not in selected_song_titles:
            selected_songs.append(song)
            selected_song_titles.add(song["title"])
        if count > 50:
            break
        count += 1

    # # Display the selected songs
    # for song in selected_songs:
    #     print(f'Title: {song["title"]}, Genres: {", ".join(song["genres"])}, Weight: {song["weight"]}')

    return selected_songs

def recalg(tuples):
    track_ids = []
    y = []

    for song_uri, reaction in tuples:
        if song_uri:
            track_ids.append(song_uri.split(':')[-1])
            y.append(reaction)

    data = np.array(track_ids)

    # data = np.array(selected_songs)

    # # data = np.array(selected_songs)

    feature_vectors = []

    # track_ids = []
    # for song in selected_songs:
    #     track_id = song['uri'].split(':')[-1]
    #     track_ids.append(track_id)

    track_infos = sp.audio_features(track_ids)

    for index in range(len(track_infos)):
        energy = track_infos[index]['energy']
        acousticness = track_infos[index]['acousticness']
        danceability = track_infos[index]['danceability']
        instrumentalness = track_infos[index]['instrumentalness']
        liveness = track_infos[index]['liveness']
        loudness = track_infos[index]['loudness']
        tempo = track_infos[index]['tempo']
        valence = track_infos[index]['valence']
        
        feature_vector = np.array([energy, acousticness, danceability, instrumentalness, liveness, loudness, tempo, valence])

        # Append the feature vector to the list
        feature_vectors.append(feature_vector)

    # Convert the list of feature vectors to a NumPy matrix
    feature_matrix = np.array(feature_vectors)

    ####TESTING####
    X = feature_matrix

    # y = []
    # for i in range(10):
    #     new_val = input()
    #     y.append(int(new_val))
    y = np.array(y)

    # y = np.array([1, 1, 1, 1, 1, -1, -1, -1, -1, -1])

    # Create a Gaussian Mixture Model
    gmm = GaussianMixture(n_components=2, random_state=42)  # You can adjust the number of components
    gmm.fit(X)

    # Generate random data points influenced by the existing data clusters
    num_samples = 10

    random_feature_sets = gmm.sample(num_samples)[0]

    # Make predictions using the SVM model (you can reuse the SVM model from the previous example)
    model = SVC(kernel='linear')
    model.fit(X, y.astype(int))
    predictions = model.predict(random_feature_sets)

    # Find the random data point with label 1 that is closest to an existing data point with label 1
    closest_index = None
    min_distance = float('inf')

    for i in range(num_samples):
        if predictions[i] == 1:  # Only consider points with label 1
            distances_to_positive = pairwise_distances(random_feature_sets[i].reshape(1, -1), X[y == 1])
            min_distance_to_positive = np.min(distances_to_positive)
            
            distances_to_negative = pairwise_distances(random_feature_sets[i].reshape(1, -1), X[y == 0])
            min_distance_to_negative = np.min(distances_to_negative)
            
            if min_distance_to_positive < min_distance and min_distance_to_positive < min_distance_to_negative:
                min_distance = min_distance_to_positive
                closest_index = i

    # Display the closest random feature set, its cluster assignment, and predicted label
    if closest_index is not None:
        cluster_assignment = gmm.predict(random_feature_sets[closest_index].reshape(1, -1))
        closest_random = random_feature_sets[closest_index]
        # print(f"Closest Random Feature Set: {random_feature_sets[closest_index]}, "
        #     f"Cluster Assignment: {cluster_assignment}, Predicted Label: {predictions[closest_index]}")

    for index in range(len(closest_random)):
        closest_random[index] = round(closest_random[index], 2)

    label_1_tracks = data[y == 1]
    random_tracks = label_1_tracks[np.random.choice(len(label_1_tracks), size=3, replace=False)]

    random_uris = []

    for track in random_tracks:
        # print(track)
        random_uris.append(track)

    # print(random_tracks)
    # print(random_uris)

    return closest_random, random_uris

def get_recs(tuples):
    starting, random_uris = recalg(tuples)

    stats = 0.1

    # for song in random_uris:
    #     print(f'URI: {song}')
        
    recommended_songs = sp.recommendations(min_energy = starting[0]-stats, max_energy = starting[0]+stats,
                                             min_acousticness = starting[1]-stats, max_acousticness = starting[1]+stats,
                                             min_danceability = starting[2]-stats, max_danceability = starting[2]+stats,
                                             min_instrumentalness = starting[3]-stats, max_instrumentalness = starting[3]+stats,
                                             min_liveness = starting[4]-stats, max_liveness = starting[4]+stats,
                                             min_loudness = starting[5]-stats, max_loudness = starting[5]+stats,
                                             min_tempo = starting[6]-10, max_tempo = starting[6]+10,
                                             min_valence = starting[7]-stats, max_valence = starting[7]+stats,
                                             seed_tracks = random_uris,
                                             limit = 50)
        
    
    # print(recommended_songs)

    # for song in recommended_songs['tracks']:
    #     print(f'Title: {song["name"]}, Artist: {song["artists"][0]["name"]}, URI: {song["uri"]}')

    if len(recommended_songs['tracks']) >= 1:
        return recommended_songs['tracks'][-1] 
    else:
        return emergency_recs(stats = 0.15, starting=starting, random_uris=random_uris)

def emergency_recs(stats, starting, random_uris):
    recommended_songs = sp.recommendations(min_energy = starting[0]-stats, max_energy = starting[0]+stats,
                                             min_acousticness = starting[1]-stats, max_acousticness = starting[1]+stats,
                                             min_danceability = starting[2]-stats, max_danceability = starting[2]+stats,
                                             min_instrumentalness = starting[3]-stats, max_instrumentalness = starting[3]+stats,
                                             min_liveness = starting[4]-stats, max_liveness = starting[4]+stats,
                                             min_loudness = starting[5]-stats, max_loudness = starting[5]+stats,
                                             min_tempo = starting[6]-10, max_tempo = starting[6]+10,
                                             min_valence = starting[7]-stats, max_valence = starting[7]+stats,
                                             seed_tracks = random_uris,
                                             limit = 50)
    if len(recommended_songs['tracks']) >= 1:
        return recommended_songs['tracks'][-1] 
    else:
        return emergency_recs(stats = stats + 0.05, starting=starting, random_uris=random_uris)
    # print(recommended_songs)