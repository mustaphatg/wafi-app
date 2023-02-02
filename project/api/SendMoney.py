from flask import request, make_response, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
import sqlite3

from .db import get_connection


# add status code 
def m_response(re, status):
    return make_response(re, status)



class SendMoney(Resource):

    @jwt_required()
    def get(self):
        conn = get_connection()
        recipient_email = request.args.get('email')
        
        try:
            result = conn.execute("SELECT name FROM users WHERE email=? LIMIT 1", (recipient_email,)).fetchone()

            # if user is valid
            if result is not None:
                return jsonify({'msg' : 'success', 'name' : result['name']})
            else:
                # user not found
                response = jsonify({'error' : True, 'msg' : "There is no user with such email"})
                return m_response(response, 401)

        except sqlite3.Error as er:
            response = jsonify({'error' : True, 'msg' : "There was an error when finding the user with such email"})
            return m_response(response, 401)

        finally:
            conn.close()



    '''
        Get account balance
        @param : email
    '''
    def get_account_balance(self, email):
        conn = get_connection()

        try:
            result = conn.execute("SELECT balance FROM users WHERE email = ?", (email,)).fetchone()
            return result['balance']

        except sqlite3.Error as er:
            return False
        
        finally:
            conn.close()



    def update_balance(self, email, amount):
        conn = get_connection()

        try:
            result = conn.execute("UPDATE users SET balance = ? WHERE email = ?", (amount, email))
            conn.commit()
            return True

        except sqlite3.Error as er:
            return 'An error occured'
        
        finally:
            conn.close()





    # method to handle snding of money
    @jwt_required()
    def post(self):

        conn = get_connection()
        current_user = get_jwt_identity()
        recipient_email = request.json.get('recipient_email')
        recipient_name = request.json.get('recipient_name')
        amount_to_send = int(request.json.get('amount_to_send'))

        # recipient account
        recipient_current_balance = self.get_account_balance(recipient_email)

        # send account
        sender_current_balance = self.get_account_balance(current_user)

        # check if the sender has enough money
        if sender_current_balance >= amount_to_send:

            # subtract sender balance from amount to send
            sender_remaining_balance = sender_current_balance - amount_to_send

            # compute receiver new balance
            recipient_new_balance = recipient_current_balance + amount_to_send

            # update sender new account balance
            self.update_balance(current_user, sender_remaining_balance)

            # update recipient new account balance
            self.update_balance(recipient_email, recipient_new_balance)

        
            # return response
            return jsonify({
                'type' : 'success',
                'msg' : "Funds sent successfully"
            })


            

        else:
            # sender does not have enough money, return error
            return jsonify({
                'type' : 'error',
                'msg' : "Not enough money"
            })
