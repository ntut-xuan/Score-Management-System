import jwt 
import hashlib
from datetime import datetime, timedelta, timezone
from util.database_util import Database as _Database

__all__ = ["Auth"]

class Auth:
    def password_encryption(password) -> str:
        m = hashlib.md5()
        m.update(password.encode("utf8"))
        m.update(m.hexdigest().encode("utf8"))
        password = m.hexdigest()
        return password

    def login(username, password):
        data = _Database.command_execute("SELECT * FROM `user` where username=%s", (username))[0]
        if data["password"] == password:
            return data["user_uid"]
        return None

    def jwt_generator(uid):
        payload = {
            "uid": uid,
            "iat": datetime.now(tz=timezone.utc),
            "exp": datetime.now(tz=timezone.utc) + timedelta(days=1)
        }
        return jwt.encode(payload, "secret", algorithm="HS256")

    def jwt_valid(SID):
        if SID == None:
            return False
        else:
            return datetime.now(tz=timezone.utc).timestamp() < Auth.jwt_decode(SID)["exp"]

    def jwt_decode(SID):
        return jwt.decode(SID, "secret", algorithms=["HS256"])

    def jwt_cookie_get(request):
        return request.cookies.get("JWT")

class User:
    def __init__(self, uid, role):
        self.uid = uid
        self.role = role
