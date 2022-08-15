from util import *
from interceptor import *
import flask

__all__ = ["index_page", "login_page", "teacher_platform_page", "platform_redirect"]

def read_html(filename):
    return open(f"../html/{filename}.html", encoding="utf8").read()

def index_page():
    return read_html("index.html")

def login_page():
    return read_html("login.html")


@teacher_login_require
def teacher_platform_page():
    return read_html("teacher-platform.html")


@login_require_or_redirect
def platform_redirect():
    if flask.request.user.role == 1:
        return flask.redirect("/t-platform")
    else:
        return flask.redirect("/s-platform")