from enum import Enum

class ErrorCode(Enum):
    USERNAME_INVALID = 201
    USERNAME_NOT_FOUND = 202
    USERNAME_EXIST = 203
    USERNAME_REPEAT = 204
    PASSWORD_NOT_MATCH = 401
    PASSWORD_INVALID = 402
    REQUIRE_PAPRMETER = 501
    REQUIRE_AUTHORIZATION = 502
    INVALID_DATA = 601
    ACCOUNT_INVALID = 701
    UNEXCEPT_ERROR = 999

def error_dict(code: ErrorCode, extend_message="") -> dict:
    return {"status": "Failed", "message": code.name, "extend_message": extend_message, "code": code.value}