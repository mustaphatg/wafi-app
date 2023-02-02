from flask_restful import Resource
from flask_jwt_extended import jwt_required
from .db import get_connection
from flask_jwt_extended import get_jwt_identity
from flask import jsonify

# add status code 
def m_response(re, status):
    return make_response(re, status)



class CheckBalance(Resource):

    @jwt_required()
    def get(self):

        conn = get_connection()
        current_user = get_jwt_identity()


        try:
            result = conn.execute("SELECT balance FROM users WHERE email = ?", (current_user,)).fetchone()
            return jsonify({
                'msg' : 'You balance is {}'.format(result['balance'])
            })

        except sqlite3.Error as er:
            response = jsonify({'error' : True, 'msg' : "An error occured when checking your balance"})
            return m_response(response, 400)
        
        finally:
            conn.close()