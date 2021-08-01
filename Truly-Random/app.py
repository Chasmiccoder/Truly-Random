# NOTE: If the server is not updating, refresh - ctrl + shift + r
from flask import Flask, render_template, url_for, redirect, request
from flask_sqlalchemy import SQLAlchemy
from wtforms_sqlalchemy.fields import QuerySelectField
from flask_wtf import FlaskForm

from datetime import datetime #remove this later

import quantum_rng

# from flask_sqlalchemy import SQLAlchemy

numbers = []

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SECRET_KEY'] = 'secret'

db = SQLAlchemy( app )



class Choice(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(50)) #Operation
    details = db.Column(db.String(150)) # Extra info
    # numbers = db.Column(db.Float)

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
    

    # Filter Query:
    # form.opts.query = Choice.query.filter( Choice.id > 1 ) # Now we won't see choice 1

    num = 0
    chosen = False

    operation = str(form.opts.data)
    
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

    # if form.validate_on_submit():
    #     return '<h1>{}</h1>'.format( form.opts.data )

    return render_template('index.html', form=form, numbers=numbers)




# class numbers():
#     nums = []

# Move this to a class
# numbers = []



if __name__ == '__main__':
    app.run(debug=True)


# @app.route('/')
# def home():
#     return render_template('index.html')

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         userName = request.form['nm']

#         # The user in quotes is the user function defined below, and usr is its parameter
#         return redirect( url_for("user", usr=userName) ) 

#     else:
#         return render_template('login.html')

#     # return render_template('login.html')

# @app.route('/<usr>')
# def user( usr ):
#     return "<h1>" + usr + "</h1>" 

