from util.auth_util import User
from util import *
import flask
from functools import wraps

__all__ = ['login_require_or_redirect', 'teacher_login_require']

def login_require_or_redirect(func):
    @wraps(func)
    def decorator(*args, **kwargs):
        jwt_cookie = Auth.jwt_cookie_get(flask.request)
        if jwt_cookie == None:
            return flask.redirect("/")
        if not Auth.jwt_valid(jwt_cookie):
            return flask.redirect("/")
        jwt_data = Auth.jwt_decode(jwt_cookie)
        role = Database.command_execute("SELECT role FROM `user` WHERE user_uid=%s", (jwt_data["uid"]))[0]["role"]
        
        flask.request.user = User(jwt_data["uid"], role)
        return func(*args, **kwargs)
    return decorator

def teacher_login_require(func):
    @wraps(func)
    @login_require_or_redirect
    def decorator(*args, **kwargs):
        
        if flask.request.user.role != 1:
            return flask.redirect("/")
        return func(*args, **kwargs)
    return decorator