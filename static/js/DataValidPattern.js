var invalid_classname = "w-full h-fit rounded-lg p-2 px-5 bg-red-400 text-white transition-all duration-500 ease-in-out";
var valid_classname = "w-full rounded-lg bg-red-400 text-white h-0 overflow-y-hidden transition-all duration-500 ease-in-out";

function accountValid(account) {
    var regex_pattern = '[a-zA-Z\\d](?:[a-zA-Z\\d]|[_-](?=[a-zA-Z\\d])){3,38}$';
    var re = new RegExp(regex_pattern);
    var matches = account.match(re);
    var test = matches && matches[0].length == account.length || account.length == 0;
    return test;
}

function emailValid(email) {
    var regex_pattern = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$";
    var re = new RegExp(regex_pattern);
    var matches = email.match(re);
    var test = matches && matches[0].length == email.length || email.length == 0;
    return test;
}

function passwordValid(password) {
    var regex_pattern = "(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,32}$";
    var re = new RegExp(regex_pattern);
    var matches = password.match(re);
    var test = matches && matches[0].length == password.length || password.length == 0;
    return test;
}

function AccountInvalidNotice(prop) {
    var test = prop.warning;
    var render = React.createElement(
        "p",
        { className: test ? valid_classname : invalid_classname },
        " \u5E33\u865F\u683C\u5F0F\u4E0D\u6B63\u78BA "
    );
    return render;
}

function EmailInvalidNotice(prop) {
    var test = prop.warning;
    var render = React.createElement(
        "p",
        { className: test ? valid_classname : invalid_classname },
        " \u4FE1\u7BB1\u683C\u5F0F\u4E0D\u6B63\u78BA "
    );
    return render;
}

function PasswordInvalidNotice(prop) {
    var test = prop.warning;
    var render = React.createElement(
        "p",
        { className: test ? valid_classname : invalid_classname },
        " \u5BC6\u78BC\u683C\u5F0F\u4E0D\u6B63\u78BA "
    );
    return render;
}