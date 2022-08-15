from util import *
from flask import *
from route import route

app = Flask(__name__, static_url_path='/static', static_folder="../static")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="3000", debug= True)

print(Auth.password_encryption("@Sms2022"))
for url, routeData in route.items():
    app.add_url_rule(url, endpoint=url, view_func=routeData["view_func"], methods=routeData["methods"])
