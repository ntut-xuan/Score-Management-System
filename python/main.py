from flask import *

app = Flask(__name__, static_url_path='')

@app.route("/static/<path:path>")
def returnStaticFile(path):
	return send_from_directory('../static', path)

@app.route("/", methods=["GET"])
def index_page():
    return open("./html/index.html").read()

@app.route("/t-login", methods=["GET"])
@app.route("/s-login", methods=["GET"])
def login_page():
    return open("./html/login.html").read()

@app.route("/t-platform", methods=["GET"])
def teacher_platform_page():
    return open("./html/teacher-platform.html").read()

if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port="3000")