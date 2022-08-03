class LoginForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {account: "", password: ""} /* It's valid to use email to be account. */
        this.handleAccountChange = this.handleAccountChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleAccountChange(event){
        this.setState({account: event.target.value})
    }
    handlePasswordChange(event){
        this.setState({password: event.target.value})
    }
    handleSubmit(event){
        event.preventDefault();

        /* Check Account and Password is valid */
        let {account, password} = this.state
        let data_valid = true
        
        /* Check account is valid */
        const account_invalid_notice_div = ReactDOM.createRoot(document.getElementById("accountInvalidNotice"))
        const password_invalid_notice_div = ReactDOM.createRoot(document.getElementById("passwordInvalidNotice"))
        if (account.includes("@")){
            let account_valid = emailValid(account);
            data_valid &= account_valid;
            account_invalid_notice_div.render(<EmailValidNotice warning={account_valid ? true : false} />)
        }else{
            let email_valid = accountValid(account);
            data_valid &= email_valid;
            account_invalid_notice_div.render(<AccountInvalidNotice warning={email_valid ? true : false} />)
        }

        /* Check password is valid */
        let password_valid = passwordValid(password)
        data_valid &= password_valid;
        password_invalid_notice_div.render(<PasswordInvalidNotice warning={password_valid ? true : false} />)

        /* Handle ajax post, but backend auth system not yet finish, so we skip it. */
        Swal.fire({
            icon: "success",
            title: "登入成功",
            showConfirmButton: false,
            timer: 1000
        })

    }
    componentDidMount(){
        setTimeout(function(){
            document.getElementById("login-form").classList.remove("max-h-0")
            document.getElementById("login-form").classList.add("max-h-[50%]")
        }, 500)
    }
    render(){
        let login_form = (
            <form onSubmit={this.handleSubmit}>
                <p className="text-center text-4xl font-['Noto_Sans_TC'] py-5"> 登入 </p>
                <div id="input-group" className="flex flex-col gap-5">
                    <div>
                        <input type="text" className="w-full p-2 border-black bg-slate-100 rounded text-base font-mono focus:bg-white focus:border-blue-500 border-2 text-center" placeholder="帳號" onChange={this.handleAccountChange} />
                        <div id="accountInvalidNotice"></div>
                    </div>
                    <div>
                        <input type="password" className="w-full p-2 border-black bg-slate-100 rounded text-base font-mono focus:bg-white focus:border-blue-500 border-2 text-center" placeholder="密碼" onChange={this.handlePasswordChange} />
                        <div id="passwordInvalidNotice"></div>
                    </div>
                </div>
                <div id="submit-group" className="mt-16">
                    <input type="submit" value="登入" className="w-full p-2 text-center text-white bg-blue-500 hover:bg-blue-300 rounded cursor-pointer" />
                </div>
            </form>
        )
        return login_form
    }
}

const root = ReactDOM.createRoot(document.getElementById("login-form"))
root.render(<LoginForm />)