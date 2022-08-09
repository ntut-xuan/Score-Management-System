from email.mime import application
import jwt
import re
import auth_util
import database_util
from datetime import datetime, timedelta
from error_code import *
from functools import wraps
from flask import *

app = Flask(__name__, static_url_path='')

def jwt_cookie_get():
    return request.cookies.get("JWT")

def login_require_or_redirect(func):
    @wraps(func)
    def decorator(*args, **kwargs):
        jwt_cookie = jwt_cookie_get()
        if jwt_cookie == None:
            return redirect("/")
        if not auth_util.jwt_valid(jwt_cookie):
            return redirect("/")
        return func(*args, **kwargs)
    return decorator

def teacher_login_require(func):
    @wraps(func)
    @login_require_or_redirect
    def decorator(*args, **kwargs):
        jwt_cookie = jwt_cookie_get()
        if jwt_cookie == None:
            return redirect("/")
        username = auth_util.jwt_decode(jwt_cookie)["username"]
        role = database_util.command_execute("SELECT role FROM `user` WHERE username=%s", (username))[0]["role"]
        if role != 1:
            return redirect("/")
        return func(*args, **kwargs)
    return decorator

@app.route("/static/<path:path>")
def returnStaticFile(path):
	return send_from_directory('../static', path)

@app.route("/", methods=["GET"])
def index_page():
    return open("../html/index.html").read()

@app.route("/t-login", methods=["GET", "POST"])
@app.route("/s-login", methods=["GET", "POST"])
def login_page():

    def get():
        return open("../html/login.html").read()
    
    def post():
        json_data = request.json

        # check data is valid
        if "username" not in json_data or "password" not in json_data:
            return Response(error_dict(ErrorCode.INVALID_DATA), mimetype="application/json")
        
        # check password and username is valid
        username = json_data["username"]
        password = auth_util.password_cypto(json_data["password"])
        username_valid = bool(re.match("[a-zA-Z\\d](?:[a-zA-Z\\d]|[_-](?=[a-zA-Z\\d])){3,38}$", username))
        password_valid = bool(re.match("(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,}$", password))
        if not username_valid:
            return Response(json.dumps(error_dict(ErrorCode.USERNAME_INVALID)), mimetype="application/json")
        if not password_valid:
            return Response(json.dumps(error_dict(ErrorCode.PASSWORD_INVALID)), mimetype="application/json")
        
        # check username is exist
        count = database_util.command_execute("SELECT COUNT(*) FROM `user` WHERE username=%s", (username))[0]["COUNT(*)"]
        if count == 0:
            return Response(json.dumps(error_dict(ErrorCode.USERNAME_NOT_FOUND)), mimetype="application/json")  

        # doing login
        login = auth_util.login(username, password)
        if login == False:
            return Response(json.dumps(error_dict(ErrorCode.PASSWORD_NOT_MATCH)), mimetype="application/json")
        
        # login success, and send a jwt token.
        resp = Response(json.dumps({"status": "OK"}), mimetype="application/json")
        resp.set_cookie("JWT", value=auth_util.payload_generator(username), expires=datetime.now() + timedelta(days=1))
        return resp

    if request.method == "GET":
        return get()
    elif request.method == "POST":
        return post()

@app.route("/platform", methods=["GET"])
@login_require_or_redirect
def platform_redirect():
    jwt_cookie = jwt_cookie_get()
    username = auth_util.jwt_decode(jwt_cookie)["username"]
    role = database_util.command_execute("SELECT role FROM `user` WHERE username=%s", (username))[0]["role"]
    if role == 1:
        return redirect("/t-platform")
    else:
        return redirect("/s-platform")

@app.route("/logout", methods=["POST"])
def logout():
    null_cookie_resp = Response(json.dumps({"status": "OK"}), mimetype="application/json")
    null_cookie_resp.set_cookie("JWT", value="", expires=0)
    return null_cookie_resp

@app.route("/t-platform", methods=["GET"])
@teacher_login_require
def teacher_platform_page():
    return open("../html/teacher-platform.html").read()

if __name__ == "__main__":
    app.debug = True
    print(auth_util.password_cypto("@Sms2022"))
    app.run(host="0.0.0.0", port="3000")