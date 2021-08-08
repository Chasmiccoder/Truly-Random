from flask import Flask, render_template, url_for, redirect, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from wtforms_sqlalchemy.fields import QuerySelectField
from flask_wtf import FlaskForm
import json

import quantum_rng

numbers = []

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SECRET_KEY'] = 'secret'

db = SQLAlchemy( app )


class Choice(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50))     #Operation
    details = db.Column(db.String(150)) # Extra info
    
    # Representation
    def __repr__(self):
        return '{}'.format(self.name) 


db.drop_all()
db.create_all()

# Operations
Op1 = Choice(name='Coin Toss', details='Simulate a True Random Coin Toss')
Op2 = Choice(name='Integer', details='Generate a Random Integer between two given numbers')
Op3 = Choice(name='Float', details='Generate a Random Float between two given numbers')
Op4 = Choice(name='N Digit Int', details='Generate a Random N Digit Integer')
Op5 = Choice(name='Fraction', details='Generate a Random Float between 0 and 1')
Op6 = Choice(name='N Digit Binary', details='Generate an N Digit Binary Number')
Operations = [Op1, Op2, Op3, Op4, Op5, Op6]



for operation in Operations:
    db.session.add( operation )

db.session.commit()

def choice_query():
    return Choice.query

class ChoiceForm(FlaskForm):
    opts = QuerySelectField(query_factory=choice_query, allow_blank=True, get_label='name')
    # The get_label attribute is better than putting __repr__ in Choice. You can pass 'id','details', or other columns


# Then we need to create an index route
@app.route('/', methods=['GET', 'POST'])
def index():
    form = ChoiceForm()
    global numbers
    
    num = 0
    chosen = False

    operation = str(form.opts.data)

    """
    if operation == 'Coin Toss':
        num = quantum_rng.random_coin_toss()
        numbers += num

        return render_template('index.html', form=form, numbers=numbers)

    elif operation == 'Integer':
        form2 = ChoiceForm()

        None

    

    """
    if operation == 'Coin Toss':
        num = quantum_rng.random_coin_toss()
        chosen = True

    elif operation == 'Integer':
        a = 0
        b = 10
        precision = 6
        num = quantum_rng.rand_int(a,b,precision)
        chosen = True

    elif operation == 'Float':
        a = 10
        b = 20
        precision = 7
        num = quantum_rng.rand_float(a,b,precision)
        chosen = True

    elif operation == 'N Digit Int':
        n = 4
        num = quantum_rng.rand_n_digit(n)
        chosen = True

    elif operation == 'Fraction':
        precision = 8
        num = quantum_rng.rand(precision)
        chosen = True

    elif operation == 'N Digit Binary':
        n = 3
        num = quantum_rng.rand_n_digit_binary(n)
        chosen = True
    
    if chosen:
        numbers += [num]

    return render_template('index.html', form=form, numbers=numbers)



# AJAX Request part

"""
import os

path_cwd = os.path.dirname(os.path.realpath(__file__))

path_templates = os.path.join(path_cwd, "templates")

path_static = os.path.join(path_cwd, "static")
"""

@app.route('/funcInteger', methods=['GET', 'POST'])
def funcInteger():
    # print("REACEHDBOIII REACEHDBOIII\n REACEHDBOIII \nREACEHDBOIII")

    dataGet = request.get_json(force=True)
    # Try without force=True

    # print(dataGet) # looks good

    # dataGet is now a python dict
    lowerLimit = dataGet["lowerLimit"]
    upperLimit = dataGet["upperLimit"]
    howMany    = dataGet["howMany"]

    numbers = []

    for i in range( howMany ):
        num = quantum_rng.rand_int(lowerLimit, upperLimit)
        numbers += [num]

    # num = 812389

    # Need to pass an array and account for n generations later (instead of just one number)
    dataReply = {"numbers": numbers }

    # print("HERE", dataReply)

    dataReply = json.dumps(dataReply)

    # print("HERE FINAL", dataReply)

    return dataReply


@app.route('/funcFloat', methods=['GET', 'POST'])
def funcFloat():

    dataGet = request.get_json(force=True)

    # dataGet is now a python dict
    lowerLimit = dataGet["lowerLimit"]
    upperLimit = dataGet["upperLimit"]
    howMany    = dataGet["howMany"]

    # numbers = quantum_rng.rand_int(lowerLimit, upperLimit, howMany)
    numbers = []

    for i in range(howMany):
        num = quantum_rng.rand_float(lowerLimit, upperLimit)
        numbers += [num]
    

    # Need to pass an array and account for n generations later (instead of just one number)
    dataReply = {"numbers": numbers }


    dataReply = json.dumps(dataReply)



    return dataReply


@app.route('/funcCoinToss', methods=['GET', 'POST'])
def funcCoinToss():

    dataGet = request.get_json(force=True)
    howMany = dataGet["howMany"]

    # numbers = quantum_rng.rand_int(lowerLimit, upperLimit, howMany)
    # numbers = quantum_rng.rand_float(lowerLimit, upperLimit, howMany)

    numbers = []

    for i in range(howMany):

        num = quantum_rng.random_coin_toss()
        numbers += [num]
    

    # Need to pass an array and account for n generations later (instead of just one number)
    dataReply = {"numbers": numbers }


    dataReply = json.dumps(dataReply)



    return dataReply



@app.route('/funcNDigitInt', methods=['GET', 'POST'])
def funcNDigitInt():

    dataGet = request.get_json(force=True)
    nValue = dataGet["nValue"]
    howMany = dataGet["howMany"]


    numbers = []

    for i in range(howMany):

        num = quantum_rng.rand_n_digit(nValue)
        numbers += [num]
    

    # Need to pass an array and account for n generations later (instead of just one number)
    dataReply = {"numbers": numbers }


    dataReply = json.dumps(dataReply)



    return dataReply


@app.route('/funcFraction', methods=['GET', 'POST'])
def funcFraction():

    dataGet = request.get_json(force=True)
    howMany = dataGet["howMany"]

    numbers = []

    for i in range(howMany):

        num = quantum_rng.rand()
        numbers += [num]
    

    # Need to pass an array and account for n generations later (instead of just one number)
    dataReply = {"numbers": numbers }


    dataReply = json.dumps(dataReply)



    return dataReply


@app.route('/funcNDigitBinary', methods=['GET', 'POST'])
def funcNDigitBinary():

    dataGet = request.get_json(force=True)
    nValue = dataGet["nValue"]
    howMany = dataGet["howMany"]


    numbers = []

    for i in range(howMany):

        num = quantum_rng.rand_n_digit_binary(nValue)
        numbers += [num]
    

    # Need to pass an array and account for n generations later (instead of just one number)
    dataReply = {"numbers": numbers }


    dataReply = json.dumps(dataReply)



    return dataReply




if __name__ == '__main__':
    app.run(debug=True)


