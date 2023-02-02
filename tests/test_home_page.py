import json


def test_home_page(app, client):

    res = client.get('/get')

    ex = {"msg":"hello"}
    assert ex == json.loads(res.get_data(as_text=1))