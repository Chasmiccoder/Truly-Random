# NOTE: If the server is not updating, refresh - ctrl + shift + r
from flask import Flask, render_template, url_for, redirect, request
from flask_sqlalchemy import SQLAlchemy
from wtforms_sqlalchemy.fields import QuerySelectField
from flask_wtf import FlaskForm

from datetime import datetime #remove this later




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


class Todo( db.Model ):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False) # nullable = False means that the user cannot create a blank task
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Task %r>' % self.id


def choice_query():
    return Choice.query


class ChoiceForm(FlaskForm):
    opts = QuerySelectField(query_factory=choice_query, allow_blank=True, get_label='name')
    # The get_label attribute is better than putting __repr__ in Choice. You can pass 'id','details', or other columns



@app.route('/', methods=['GET', 'POST'])
def index():
    form = ChoiceForm()
    global numbers
    

    # Filter Query:
    # form.opts.query = Choice.query.filter( Choice.id > 1 ) # Now we won't see choice 1

    num = 0

    operation = str(form.opts.data)
    
    if operation == 'Coin Toss':
        num = 1
    elif operation == 'Integer':
        num = 2
    elif operation == 'Float':
        num = 3
    elif operation == 'N Digit Int':
        num = 4
    elif operation == 'Fraction':
        num = 5
    elif operation == 'N Digit Binary':
        num = 6
    
    numbers += [num]

    # if form.validate_on_submit():
    #     return '<h1>{}</h1>'.format( form.opts.data )

    return render_template('index.html', form=form, numbers=numbers)




# class numbers():
#     nums = []

# Move this to a class
# numbers = []

# Then we need to create an index route
@app.route('/', methods=['POST', 'GET'])
def index2():
    global numbers

    if request.method == 'POST':
        # operation = request.form.get('select_operation')

        operation = ChoiceForm()

        # new_task = Todo(content=task_content)
        num = 0 # depending on operation

        if operation.data == "dingo":
            num = 1

        try:
            numbers += [num]
            numbers += [operation]
            return redirect('/') # Redirect to the home page
        except:
            return "Error while Adding Task!"

    else:
        return render_template('index.html', numbers=numbers)
    



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

