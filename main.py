from flask import Flask

app = Flask(__name__)
port = 8080 

@app.route('/pythonapi1')
def python_api1():
    return 'Hello from my Python API 1'

@app.route('/pythonapi2')
def python_api2():
    return 'Hello from my Python API 2'

if __name__ == '__main__':
    app.run(port=port,host='0.0.0.0')
