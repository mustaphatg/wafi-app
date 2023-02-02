import json
from flask_jwt_extended import create_access_token


def test_deposit_money(app, client):

    # create context
    with app.app_context():
        token = create_access_token('m@gmail.com')
    
    payload = {'amount' : 50}

    headers = {
        'Authorization': 'Bearer {}'.format(token)
    }

    response = client.post('/api/deposit', json=payload, headers=headers)

    assert 200 == response.status_code
    assert "Funds deposited successfully" == response.json['msg']
