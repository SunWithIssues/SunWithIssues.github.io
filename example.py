

# hello world program
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Index Page"

@app.route("/hello")
def hello():
    return '<h1>Hello World</h1>'

if __name__ == "__main__":
    app.run()


from flask import Flask
from flask import request

# GET and POST examples
@app.route('/example/field1=<value1>&field2=<int:value2>', methods = ['GET', 'POST'])
def example(value1, value2):
    if request.method == 'GET':
        # ...
        pass
    if request.method == 'POST':
        data = request.form 
        # ...
        pass
    else:
        # POST Error 405 Method Not Allowed
        pass





