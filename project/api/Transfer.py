from flask_restful import Resource
from flask_jwt_extended import jwt_required
from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity

from .db import get_connection


class Transfer(Resource):


        

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



    '''
        Update balance of user
        @param email
    '''
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




    # method to handle transferring  of money
    @jwt_required()
    def post(self):

        conn = get_connection()
        amount_to_transfer = int(request.json.get('amount_to_transfer'))
        current_user = get_jwt_identity()


        # user account balance account
        current_balance = self.get_account_balance(current_user)

        # check if the sender has enough money
        if current_balance >= amount_to_transfer:

            # subtract user balance from amount to transfer
            user_remaining_balance = current_balance - amount_to_transfer

            # update user  new account balance
            self.update_balance(current_user, user_remaining_balance)

        
            # return response
            return jsonify({
                'type' : 'success',
                'msg' : "Funds transfered successfully"
            })


            

        else:
            # sender does not have enough money, return error
            return jsonify({
                'type' : 'error',
                'msg' : "Not enough money"
            })