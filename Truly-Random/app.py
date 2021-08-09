from flask import Flask, render_template, request
import json
import quantum_rng

numbers = []
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():   
    return render_template('index.html')


# AJAX Requests from main.js
@app.route('/funcInteger', methods=['GET', 'POST'])
def funcInteger():
    dataGet = request.get_json(force=True)
    
    lowerLimit = dataGet["lowerLimit"]
    upperLimit = dataGet["upperLimit"]
    howMany    = dataGet["howMany"]
    numbers = []

    for _ in range(howMany):
        num = quantum_rng.rand_int(lowerLimit, upperLimit)
        numbers += [num]

    dataReply = json.dumps( { "numbers": numbers } )
    return dataReply


@app.route('/funcFloat', methods=['GET', 'POST'])
def funcFloat():

    dataGet = request.get_json(force=True)

    lowerLimit = dataGet["lowerLimit"]
    upperLimit = dataGet["upperLimit"]
    howMany    = dataGet["howMany"]
    precision  = dataGet["precision"]
    numbers = []

    for _ in range(howMany):
        num = quantum_rng.rand_float(lowerLimit, upperLimit, precision)
        numbers += [num]
    
    dataReply = json.dumps( { "numbers": numbers } )
    return dataReply


@app.route('/funcCoinToss', methods=['GET', 'POST'])
def funcCoinToss():

    dataGet = request.get_json(force=True)
    howMany = dataGet["howMany"]
    numbers = []

    for _ in range(howMany):
        num = quantum_rng.random_coin_toss()
        numbers += [num]
    
    dataReply = json.dumps( { "numbers": numbers } )
    return dataReply


@app.route('/funcNDigitInt', methods=['GET', 'POST'])
def funcNDigitInt():

    dataGet = request.get_json(force=True)
    nValue = dataGet["nValue"]
    howMany = dataGet["howMany"]
    numbers = []

    for _ in range(howMany):
        num = quantum_rng.rand_n_digit(nValue)
        numbers += [num]
    
    dataReply = json.dumps( { "numbers": numbers } )
    return dataReply


@app.route('/funcFraction', methods=['GET', 'POST'])
def funcFraction():

    dataGet = request.get_json(force=True)
    howMany = dataGet["howMany"]
    precision = dataGet["precision"]

    numbers = []

    for _ in range(howMany):
        num = quantum_rng.rand( precision )
        numbers += [num]
    
    dataReply = json.dumps( { "numbers": numbers } )
    return dataReply


@app.route('/funcNDigitBinary', methods=['GET', 'POST'])
def funcNDigitBinary():

    dataGet = request.get_json(force=True)
    nValue = dataGet["nValue"]
    howMany = dataGet["howMany"]
    numbers = []

    for _ in range(howMany):
        num = quantum_rng.rand_n_digit_binary(nValue)
        numbers += [num]
    
    dataReply = json.dumps( { "numbers": numbers } )
    return dataReply


if __name__ == '__main__':
    app.run(debug=True)
