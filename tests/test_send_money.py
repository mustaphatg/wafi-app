import json
from flask_jwt_extended import create_access_token


def test_send_money(app, client):

    # create context
    with app.app_context():
        token = create_access_token('m@gmail.com')
    
    payload = {
        'recipient_email' : 'm123@gmail.com', 
        'amount_to_send' : 20
    }

    headers = {
        'Authorization': 'Bearer {}'.format(token)
    }

    response = client.post('/api/send', json=payload, headers=headers)

    assert 200 == response.status_code
    assert "Funds sent successfully" == response.json['msg']
