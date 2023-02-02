from flask import request, make_response, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from .db import get_connection
from flask_jwt_extended import get_jwt_identity
import sqlite3



# add status code 
def m_response(re, status):
    return make_response(re, status)


class Deposit(Resource):

    @jwt_required()
    def post(self):
        amount = int(request.json.get('amount'))
        conn = get_connection()
        email = get_jwt_identity()


        try:
            result = conn.execute('UPDATE users SET balance = balance + ? WHERE email=?', (amount, email))
            conn.commit()
            return jsonify({'msg' : 'Funds deposited successfully'})
        except sqlite3.Error as er:
            response =  {
                'error' : True, 
                'msg' : "An error occurred when depositing your funds. Try again later", 
                'error_msg' : er
            }

            return m_response(response, 401)
        finally:
            conn.close()
