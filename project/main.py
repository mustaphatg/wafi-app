from flask import Flask, request, render_template, session, abort, url_for, jsonify, make_response
from flask_restful import Api, Resource, reqparse

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import unset_jwt_cookies

from flask_cors import CORS
from project.api.db import get_connection
# import simplejson as json

# login module
from project.api.auth import user_login

# signup module
from project.api.auth import user_signup

# check balance  module
from project.api.CheckBalance import CheckBalance

# Deposit Money  module
from project.api.Deposit import Deposit

# Semd Money  module
from project.api.SendMoney import SendMoney

# transfer Money  module
from project.api.Transfer import Transfer



# initialise flask app
app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "my-jwt-secret" 
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False
jwt  = JWTManager(app)



# api form flask restful
api = Api(app)


# add status code 
def m_response(re, status):
    return make_response(re, status)



# home page
@app.route('/')
def index():
    return render_template('index.html')

# account page
@app.route('/account')
def account():
    return render_template('index.html')




# Login 
@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    result  = user_login(email, password)

    if(result['error'] is False):
        # generate and send token
        token = create_access_token(identity=email)
        return jsonify({"token" : token})
    else:
        # return error
        return m_response(result, 401)





# User Signup 
@app.post('/api/register')
def register():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')

  
    result = user_signup(name, email, password)

    if(result['error'] is False):
        # generate and send token
        token = create_access_token(identity=email)
        return jsonify({"token" : token, 'msg' : 'Account created successfully'})
    else:
        # return error
        return m_response(result, 401)




# User logout 
@app.post('/api/logout')
def logout():
    response  = jsonify({'message' : 'user logged out'})
    unset_jwt_cookies(response)
    return response



# user profile
@app.get('/api/profile')
@jwt_required()
def profile():
    id  = get_jwt_identity()
    conn = get_connection()

    try:
        result = conn.execute('SELECT * FROM users WHERE email = ?', (id,)).fetchone()
        return jsonify(result)
    except sqlite3.Error as er:
        return jsonify({'error' : True,'msg' : 'An error occured while fetching your profile'})
    finally:
        conn.close()
   


#  Check Balance api resource
api.add_resource(CheckBalance, '/api/balance')


#  Deposit money api resource
api.add_resource(Deposit, '/api/deposit')


#  Send money api resource
api.add_resource(SendMoney, '/api/send')



#  Tramsfer money api resource
api.add_resource(Transfer, '/api/transfer')






@app.get('/get')
def dell():
    # conn = get_connection()
    # users  = conn.execute('select * from users').fetchall()
    return {
        'msg' : 'hello'
    }
    


#  to clean database for testing
@app.get('/del')
def dele():

    conn = get_connection()
    r = conn.execute("DELETE FROM users WHERE id != ?", (1,))
    conn.commit()
    return 'deleted'


@app.errorhandler(404)
def page_not_found(e):
    # note that we set the 404 status explicitly
    return render_template('index.html'), 404




if __name__ == '__main__':
    app.run(port=5000, debug=True)



