import sys
sys.path.append(".\python")
sys.path.append("..")
import unittest
from flask import json
import util
from main import app
from uuid import uuid4


test_client = app.test_client()
API_URL = "/api/teacher"


def login_test(account, password):
    data = json.dumps({
        "username": account,
        "password": password
    })
    resp = test_client.post(f"{API_URL}/login", data=data, headers={"content-type": "application/json"})
    return json.loads(resp.data)

''' LOGIN TEST START '''
class LoginUnitTest(unittest.TestCase):

    # def setUp(self) -> None:
    #     hash = hashlib.sha512(str("uriahxuan99").encode("utf-8")).hexdigest()
    #     database_util.command_execute("INSERT INTO `user`(user_uid, handle, password, email, role, email_verified) VALUES(%s, %s, %s, %s, %s, %s)", (str(uuid4()), "uriahxuan", password_cypto(hash), "nuoj@test.net", 0, True))
    #     return super().setUp()

    def test_login_empty_usernme(self):
        print("test login empty username")
        data = json.loads(test_client.post(f"{API_URL}/login", data='{"account": ""}', headers={"content-type": "application/json"}).data)
        self.assertEqual(data["code"], util.ErrorCode.INVALID_DATA.value)
        print("---end---")

    def test_login_invalid_username(self):
        test_datas = [
            ["", util.ErrorCode.USERNAME_INVALID.value],
            ["__uriahxuan__", util.ErrorCode.USERNAME_INVALID.value],
            ["uriah__xuan", util.ErrorCode.USERNAME_INVALID.value],
            ["uriah--xuan", util.ErrorCode.USERNAME_INVALID.value],
            ["        ", util.ErrorCode.USERNAME_INVALID.value],
        ]
        for i in range(test_datas.__len__()):
            test_data = test_datas[i]
            print(f"test login invalid username #{i+1}")
            data = login_test(test_data[0], str(uuid4()))
            self.assertEqual(data["code"], test_data[1])
            print("---end---")

    def test_login_invalid_password(self):
        test_datas = [
            ["", util.ErrorCode.PASSWORD_INVALID.value],
            ["__uriahxuan__", util.ErrorCode.PASSWORD_INVALID.value],
            ["uriah__xuan", util.ErrorCode.PASSWORD_INVALID.value],
            ["uriah--xuan", util.ErrorCode.PASSWORD_INVALID.value],
            ["        ", util.ErrorCode.PASSWORD_INVALID.value],
        ]
        for i in range(test_datas.__len__()):
            test_data = test_datas[i]
            print(f"test login invalid password #{i+1}")
            data = login_test("xuan", test_data[0])
            self.assertEqual(data["code"], test_data[1])
            print("---end---")

    def test_login_username_not_found(self):
        print("test login username not found #1")
        data = login_test("xuan", "@Sms2022")
        self.assertEqual(data["code"], util.ErrorCode.USERNAME_NOT_FOUND.value)
        print("---end---")

    def test_login_passowrd_not_match(self):
        print("test login passowrd not match #1")
        data = login_test("sms_admin", "@Ams2022")
        self.assertEqual(data["code"], util.ErrorCode.PASSWORD_NOT_MATCH.value)
        print("---end---")


if __name__ == "__main__":
    unittest.main()