from .db import get_connection
import sqlite3

def user_login(email, password):
    conn = get_connection()

    # check if details are correct
    try:
        sql = "SELECT * FROM  users WHERE email=? AND password = ? LIMIT 1"
        row  = conn.execute(sql, (email, password) ).fetchone()

        # details are not correct
        if row is None:
            return {'error' : True, 'msg' : 'Wrong username or password'}
        else:
            # details are correct
            return {'error' : False, 'msg' : 'Logged in successfully'}

    except sqlite3.Error as er:
        return {'error' : er, 'msg' : 'An error occured while verifying your details'}

    finally:
        conn.close()





# create use account
def user_signup(name, email, password):
    conn = get_connection()

    # check if user exist with such email
    try:
        row = conn.execute("SELECT * FROM users WHERE email=? ", (email,) ).fetchone()

    # if a use exists
        if row is not None:
            return {'error' : True, 'msg' : 'A user exists with such email'}
        
        else:
            sql = "INSERT INTO users (name, email, password, balance) VALUES(?,?,?,?)"
            result = conn.execute(sql, (name, email, password, 0))
            conn.commit()
            return {'error' : False, 'msg' : 'Account created successfully'}

    except sqlite3.Error as er:
        # print(er)
        return {'error' : er, 'msg' : 'An error occured while verifying your details'}

    finally:
        conn.close()

    
   

