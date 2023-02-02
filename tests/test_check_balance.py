import json
from flask_jwt_extended import create_access_token


def test_check_balance(app, client):

    # create context
    with app.app_context():
        token = create_access_token('m@gmail.com')
    
    headers = {
        'Authorization': 'Bearer {}'.format(token)
    }

    response = client.get('/api/balance', headers=headers)

    assert 200 == response.status_code
    assert "You balance is" in response.json['msg']
