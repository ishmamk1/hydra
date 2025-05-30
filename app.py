from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def github_webhook():
    print("✅ Webhook received!")
    print("Headers:", dict(request.headers))
    print("Payload:", request.get_json())

    return jsonify({'message': 'Webhook received'}), 200

@app.route('/', methods=['GET'])
def health_check():
    return 'Server is running', 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
