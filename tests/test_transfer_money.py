import json
from flask_jwt_extended import create_access_token



def test_transfer_money(app, client):

    # create context
    with app.app_context():
        token = create_access_token('m@gmail.com')
    
    payload = {
        'amount_to_transfer' : 20, 
    }

    headers = {
        'Authorization': 'Bearer {}'.format(token)
    }

    response = client.post('/api/transfer', json=payload, headers=headers)

    assert 200 == response.status_code
    assert "Funds transfered successfully" == response.json['msg']
