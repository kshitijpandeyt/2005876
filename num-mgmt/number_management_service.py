import requests
from flask import Flask, request, jsonify
from concurrent.futures import ThreadPoolExecutor

app = Flask(__name__)

def fetch_numbers(url):
    try:
        response = requests.get(url, timeout=0.5)
        if response.status_code == 200:
            data = response.json()
            return data.get("numbers", [])
    except (requests.exceptions.Timeout, requests.exceptions.RequestException):
        pass
    return []

@app.route("/numbers")
def get_numbers():
    urls = request.args.getlist("url")
    numbers = set()

    with ThreadPoolExecutor() as executor:
        results = list(executor.map(fetch_numbers, urls))

    for result in results:
        numbers.update(result)

    return jsonify({"numbers": sorted(list(numbers))})

if __name__ == "__main__":
    app.run(host="localhost", port=8008)
