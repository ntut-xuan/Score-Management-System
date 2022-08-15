from view import *
from api import *

__all__ = ["route"]

route = {}

def addRoute(urlPattern, func, methods):
    route[urlPattern] = {
        "view_func": func,
        "methods": methods
    }

addRoute("/", index_page, ["GET",])
addRoute("/platform", platform_redirect, ["GET",])
addRoute("/t-login", login_page, ["GET",])
addRoute("/s-login", login_page, ["GET",])
addRoute("/t-platform", teacher_platform_page, ["GET", ])

addRoute("/api/logout", Common.logout, ["POST",])
addRoute("/api/student/login", Student.login, ["POST",])
addRoute("/api/teacher/login", Teacher.login, ["POST",])