import flask

__all__ = ["Common"]

class Common:
    def logout():
        null_cookie_resp = flask.Response(flask.json.dumps({"status": "OK"}), mimetype="application/json")
        null_cookie_resp.set_cookie("JWT", value="", expires=0)
        return null_cookie_resp