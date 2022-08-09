import jwt
import hashlib
from datetime import datetime, timedelta, timezone
from database_util import command_execute

def password_cypto(password) -> str:
	m = hashlib.md5()
	m.update(password.encode("utf8"))
	m.update(m.hexdigest().encode("utf8"))
	password = m.hexdigest()
	return password

def login(username, password):
    data = command_execute("SELECT * FROM `user` where username=%s", (username))[0]
    if data["password"] == password:
        return True
    return False

def payload_generator(username):
	payload = {"username": username, "iat": datetime.now(tz=timezone.utc), "exp": datetime.now(tz=timezone.utc) + timedelta(days=1)}
	return jwt.encode(payload, "secret", algorithm="HS256")

def jwt_valid(SID):
	return not (SID == None or datetime.now(tz=timezone.utc).timestamp() > jwt.decode(SID, "secret", algorithms=["HS256"])["exp"])

def jwt_decode(SID):
	return jwt.decode(SID, "secret", algorithms=["HS256"])