import sqlite3
import os 


# convert sqlite3 row to dictionary
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


# return connection object
def get_connection():
    path = os.path.dirname(__file__)
    path = os.path.join(path, 'store.sqlite')

    conn = sqlite3.connect(path)
    conn.row_factory = dict_factory
    return conn


# setup project table
# conn = get_connection()
# conn.execute('''CREATE TABLE users (

#     id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
#     name VARCHAR(255) NOT NULL,
#     email VARCHAR(255) NOT NULL,
#     password VARCHAR(255) NOT NULL,
#     balance FLOAT NOT NULL

# )''')



# conn = get_connection()
# conn.execute('drop table users')





# conn.execute('''insert into users 
#     (name, email, balance)
#     values('Ibrahim 22', 'musty22@gmail.com', 444) ''')

# conn.commit()
