const ERROR_CODE = Object.freeze({
    "USERNAME_INVALID": {"code": 201, "message": "Username 不合法"}, 
    "USERNAME_NOT_FOUND": {"code": 202, "message": "Username 不存在"}, 
    "USERNAME_EXIST": {"code": 203, "message": "Username 已存在"}, 
    "USERNAME_REPEAT": {"code": 204, "message": "Username 已重複"}, 
    "PASSWORD_NOT_MATCH": {"code": 401, "message": "密碼不符合"},
    "PASSWORD_INVALID": {"code": 402, "message": "密碼不符合規定"},
    "REQUIRE_PAPRMETER": {"code": 501, "message": "缺少參數"},
    "REQUIRE_AUTHORIZATION": {"code": 502, "message": "需要驗證"},
    "INVALID_DATA": {"code": 601, "message": "資料無效"},
    "ACCOUNT_INVALID": {"code": 701, "message": "Username 或信箱無效"},
    "UNEXCEPT_ERROR": {"code": 999, "message": "未預期的錯誤發生"},
})

function getMessageFromCode(code){
    let keys = Object.keys(ERROR_CODE)
    for(let i = 0; i < keys.length; i++){
        let key = keys[i];
        if(ERROR_CODE[key]["code"] === code){
            return ERROR_CODE[key]["message"]
        }
    }
}

function success_swal(title){
    return Swal.fire({
        icon: "success",
        title: title,
        timer: 1500,
        showConfirmButton: false
    })
}

function error_swal(title, code){
    Swal.fire({
        icon: "error",
        title: title,
        text: getMessageFromCode(code),
        timer: 1500,
        showConfirmButton: false
    })
}