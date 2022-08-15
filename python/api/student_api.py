from util import *
import re
import flask
from datetime import datetime, timedelta

__all__ = ["Student"]

class Student:
    def login():    
        json_data = flask.request.json

        # check data is valid
        if "username" not in json_data or "password" not in json_data:
            return error_response(ErrorCode.INVALID_DATA)
        
        # check password and username is valid
        username = json_data["username"]
        password = Auth.password_encryption(json_data["password"])
        username_valid = bool(re.match("[a-zA-Z\\d](?:[a-zA-Z\\d]|[_-](?=[a-zA-Z\\d])){3,38}$", username))
        password_valid = bool(re.match("(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,}$", password))
        if not username_valid:
            return error_response(ErrorCode.USERNAME_INVALID)
        if not password_valid:
            return error_response(ErrorCode.PASSWORD_INVALID)
        
        # check username is exist
        count = Database.command_execute("SELECT COUNT(*) FROM `user` WHERE username=%s", (username))[0]["COUNT(*)"]
        if count == 0:
            return error_response(ErrorCode.USERNAME_NOT_FOUND)

        # doing login
        user_uid = Auth.login(username, password)
        if user_uid == None:
            return error_response(ErrorCode.PASSWORD_NOT_MATCH)
        
        # login success, and send a jwt token.
        resp = flask.Response(flask.json.dumps({"status": "OK"}), mimetype="application/json")
        resp.set_cookie("JWT", value=Auth.jwt_generator(user_uid), expires=datetime.now() + timedelta(days=1))
        return resp