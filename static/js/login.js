var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginForm = function (_React$Component) {
    _inherits(LoginForm, _React$Component);

    function LoginForm(props) {
        _classCallCheck(this, LoginForm);

        var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

        _this.state = { account: "", password: "" /* It's valid to use email to be account. */
        };_this.handleAccountChange = _this.handleAccountChange.bind(_this);
        _this.handlePasswordChange = _this.handlePasswordChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(LoginForm, [{
        key: "handleAccountChange",
        value: function handleAccountChange(event) {
            this.setState({ account: event.target.value });
        }
    }, {
        key: "handlePasswordChange",
        value: function handlePasswordChange(event) {
            this.setState({ password: event.target.value });
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(event) {
            event.preventDefault();

            /* Check Account and Password is valid */
            var _state = this.state,
                account = _state.account,
                password = _state.password;

            var data_valid = true;

            /* Check account is valid */
            var account_invalid_notice_div = ReactDOM.createRoot(document.getElementById("accountInvalidNotice"));
            var password_invalid_notice_div = ReactDOM.createRoot(document.getElementById("passwordInvalidNotice"));
            if (account.includes("@")) {
                var account_valid = emailValid(account);
                data_valid &= account_valid;
                account_invalid_notice_div.render(React.createElement(EmailValidNotice, { warning: account_valid ? true : false }));
            } else {
                var email_valid = accountValid(account);
                data_valid &= email_valid;
                account_invalid_notice_div.render(React.createElement(AccountInvalidNotice, { warning: email_valid ? true : false }));
            }

            /* Check password is valid */
            var password_valid = passwordValid(password);
            data_valid &= password_valid;
            password_invalid_notice_div.render(React.createElement(PasswordInvalidNotice, { warning: password_valid ? true : false }));

            /* Handle ajax post, but backend auth system not yet finish, so we skip it. */
            if (data_valid) {
                $.ajax({
                    url: window.location.pathname,
                    data: JSON.stringify({ "username": account, "password": password }),
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    success: function success(data, status, xhr) {
                        if (data["status"] == "OK") {
                            success_swal("登入成功").then(function () {
                                window.location.href = "/platform";
                            });
                        } else {
                            error_swal("登入失敗", data["code"]);
                        }
                    }
                });
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            setTimeout(function () {
                document.getElementById("login-form").classList.remove("max-h-0");
                document.getElementById("login-form").classList.add("max-h-[50%]");
            }, 100);
        }
    }, {
        key: "render",
        value: function render() {
            var login_form = React.createElement(
                "form",
                { onSubmit: this.handleSubmit },
                React.createElement(
                    "p",
                    { className: "text-center text-4xl font-['Noto_Sans_TC'] py-5" },
                    " \u767B\u5165 "
                ),
                React.createElement(
                    "div",
                    { id: "input-group", className: "flex flex-col gap-5" },
                    React.createElement(
                        "div",
                        null,
                        React.createElement("input", { type: "text", className: "w-full p-2 border-black bg-slate-100 rounded text-base font-mono focus:bg-white focus:border-blue-500 border-2 text-center", placeholder: "\u5E33\u865F", onChange: this.handleAccountChange }),
                        React.createElement("div", { id: "accountInvalidNotice" })
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement("input", { type: "password", className: "w-full p-2 border-black bg-slate-100 rounded text-base font-mono focus:bg-white focus:border-blue-500 border-2 text-center", placeholder: "\u5BC6\u78BC", onChange: this.handlePasswordChange }),
                        React.createElement("div", { id: "passwordInvalidNotice" })
                    )
                ),
                React.createElement(
                    "div",
                    { id: "submit-group", className: "mt-16" },
                    React.createElement("input", { type: "submit", value: "\u767B\u5165", className: "w-full p-2 text-center text-white bg-blue-500 hover:bg-blue-300 rounded cursor-pointer" })
                )
            );
            return login_form;
        }
    }]);

    return LoginForm;
}(React.Component);

var root = ReactDOM.createRoot(document.getElementById("login-form"));
root.render(React.createElement(LoginForm, null));