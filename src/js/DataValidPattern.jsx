let invalid_classname = "w-full h-fit rounded-lg p-2 px-5 bg-red-400 text-white transition-all duration-500 ease-in-out"
let valid_classname = "w-full rounded-lg bg-red-400 text-white h-0 overflow-y-hidden transition-all duration-500 ease-in-out"

function accountValid(account){
    let regex_pattern = '[a-zA-Z\\d](?:[a-zA-Z\\d]|[_-](?=[a-zA-Z\\d])){3,38}$'
    let re = new RegExp(regex_pattern)
    let matches = account.match(re)
    let test = ((matches && matches[0].length == account.length) || (account.length == 0))
    return test;
}

function emailValid(email){
    let regex_pattern = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"
    let re = new RegExp(regex_pattern)
    let matches = email.match(re)
    let test = ((matches && matches[0].length == email.length) || (email.length == 0))
    return test
}

function passwordValid(password){
    let regex_pattern = "(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,32}$"
    let re = new RegExp(regex_pattern)
    let matches = password.match(re)
    let test = ((matches && matches[0].length == password.length) || (password.length == 0))
    return test
}

function AccountInvalidNotice(prop){
    let test = prop.warning
    let render = (
        <p className={test ? valid_classname : invalid_classname}> 帳號格式不正確 </p>
    )
    return render;
}

function EmailInvalidNotice(prop){
    let test = prop.warning
    let render = (
        <p className={test ? valid_classname : invalid_classname}> 信箱格式不正確 </p>
    )
    return render;
}

function PasswordInvalidNotice(prop){
    let test = prop.warning
    let render = (
        <p className={test ? valid_classname : invalid_classname}> 密碼格式不正確 </p>
    )
    return render;
}