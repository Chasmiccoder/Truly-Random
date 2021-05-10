from flask import Flask, render_template, url_for, redirect, request


app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        userName = request.form['nm']

        # The user in quotes is the user function defined below, and usr is its parameter
        return redirect( url_for("user", usr=userName) ) 

    else:
        return render_template('login.html')

    return render_template('login.html')

@app.route('/<usr>')
def user( usr ):
    return "<h1>" + usr + "</h1>" 


if __name__ == '__main__':
    app.run(debug=True)