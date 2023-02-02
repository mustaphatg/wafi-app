import json


def test_add_user(app, client):

    payload = {
        'name' : 'Ibrahim Musapha',
        'email' : 'm123@gmail.com',
        'password' : '123'
    }

    res = client.post('/api/register', json=payload )

    assert "Account created successfully" == res.json['msg']
