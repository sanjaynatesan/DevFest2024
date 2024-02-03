import os
import psycopg2

conn = psycopg2.connect(
    host="34.30.54.122",
    database="user-songs",
    user='kent',
    password='cookiecrew'
)

cur = conn.cursor()

cur.execute("SELECT * FROM table;")

cur.close()
conn.close()
