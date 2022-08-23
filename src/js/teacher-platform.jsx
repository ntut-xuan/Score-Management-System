class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date_string: "", 
            time_string: "", 
            time_format: props.time_format, 
            date_format: props.date_format
        }
    }
    componentDidMount(){
        let {time_format, date_format} = this.state
        this.timer_id = setInterval(() => {
            time_string = luxon.DateTime.now().setZone("Asia/Taipei").toFormat(time_format)
            date_string = luxon.DateTime.now().setZone("Asia/Taipei").toFormat(date_format)
            this.setState({time_string: time_string, date_string: date_string})
        }, 500)
    }
    componentWillUnmount(){
        clearInterval(this.timer_id)
    }
    render(){
        let {date_string, time_string} = this.state
        return [<p className="text-4xl py-1 font-['Airborne']"> {date_string} </p>, <p className="text-4xl py-1 font-['Airborne']"> {time_string} </p>]
    }
}

class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return (
            <div id="main_page" className="h-[75vh] flex flex-row gap-5 relative transition-all duration-1000 overflow-hidden">
                <div className="w-[35%] border-2 p-5 py-5">
                    <p className="text-center pb-5 text-xl"> 班級人員列表 </p>
                    <div className="flex flex-col gap-5 h-[63vh] overflow-y-auto">
                        <div className="p-5 bg-blue-200 rounded hover:bg-blue-100 cursor-pointer">
                            <p className="text-xl"> 奇怪的人 </p>
                            <p className="text-sm pt-2"> 資工碩二 - 109598091 </p>
                        </div>
                        <div className="p-5 bg-orange-200 rounded hover:bg-orange-100 cursor-pointer">
                            <p className="text-xl"> 某個人 </p>
                            <p className="text-sm pt-2"> 資工二 - 109590091 </p>
                        </div>
                        <div className="p-5 bg-orange-200 rounded hover:bg-orange-100 cursor-pointer">
                            <p className="text-xl"> 某個人 </p>
                            <p className="text-sm pt-2"> 資工二 - 109590091 </p>
                        </div>
                        <div className="p-5 bg-orange-200 rounded hover:bg-orange-100 cursor-pointer">
                            <p className="text-xl"> 某個人 </p>
                            <p className="text-sm pt-2"> 資工二 - 109590091 </p>
                        </div>
                        <div className="p-5 bg-orange-200 rounded hover:bg-orange-100 cursor-pointer">
                            <p className="text-xl"> 某個人 </p>
                            <p className="text-sm pt-2"> 資工二 - 109590091 </p>
                        </div>
                        <div className="p-5 bg-orange-200 rounded hover:bg-orange-100 cursor-pointer">
                            <p className="text-xl"> 某個人 </p>
                            <p className="text-sm pt-2"> 資工二 - 109590091 </p>
                        </div>
                    </div>
                </div>
                <div className="w-[65%] flex flex-col gap-5">
                    <div className="h-[45%] border-2 p-5">
                        <p className="text-center pb-5 text-xl"> 近期兩次作業 </p>
                        <div className="flex flex-row gap-5">
                            <div className="p-5 bg-red-200 rounded h-full w-[50%] hover:bg-red-100 cursor-pointer">
                                <p className="text-xl"> 作業 #1 </p>
                                <p className="text-sm pt-3"> 由 [奇怪的人] 指派 </p>
                                <p className="text-sm pt-3"> 繳交人數：63/64 </p>
                                <p className="text-sm pt-3"> 繳交期限：2022/08/24 </p>
                            </div>
                            <div className="p-5 bg-red-200 rounded h-full w-[50%] hover:bg-red-100 cursor-pointer">
                                <p className="text-xl"> 作業 #2 </p>
                                <p className="text-sm pt-3"> 由 [奇怪的人] 指派 </p>
                                <p className="text-sm pt-3"> 繳交人數：22/64 </p>
                                <p className="text-sm pt-3"> 繳交期限：2022/09/01 </p>
                            </div>
                        </div>
                    </div>
                    <div className="h-[55%] border-2 p-5">
                        <p className="text-center text-xl pb-5"> 統計數據 </p>
                        <div className="flex flex-row gap-5 justify-center">
                            <div className="rounded h-fit w-full border-2 p-5">
                                <p className="text-center"> 近一次繳交功課情況 </p>
                                <div className="rounded h-full w-[81%] mx-auto">
                                    <canvas className="w-full h-full" id="chart1"></canvas>
                                </div>
                            </div>
                            <div className="rounded h-fit w-full border-2 p-5">
                                <p className="text-center"> 班級預警學生比例 </p>
                                <div className="rounded h-full w-[81%] mx-auto">
                                    <canvas className="w-full h-full" id="chart2"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class StudentCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            student_course: props.student_course, 
            student_id: props.student_id, 
            student_name: props.student_name, 
            student_avater_url: props.student_avater, 
            student_role : props.student_role
        }
        this.student_role_color = this.student_role_color.bind(this)
    }
    student_role_color() {
        let {student_role} = this.state
        if(student_role == "student"){
            return "bg-orange-100 hover:bg-orange-50"
        }
        if(student_role == "TA"){
            return "bg-blue-100 hover:bg-blue-50"
        }
    }
    render() {
        let {student_course, student_id, student_name, student_avater_url} = this.state
        return [
            <p className="bg-orange-100 hover:bg-orange-50 hidden"></p>,
            <p className="bg-blue-100 hover:bg-blue-50 hidden"></p>,
            <div className={"w-full p-5 rounded-lg transition-all duration-200 cursor-pointer " + this.student_role_color()}>
                <img className="w-24 h-24 mx-auto rounded-full object-center bg-white border-2" src={student_avater_url}></img>
                <div className="pt-5">
                    <p className="w-full text-center rounded-lg text-lg"> {student_name} </p>
                    <p className="w-full text-center rounded-lg text-lg"> {student_course}</p> 
                    <p className="w-full text-center rounded-lg text-lg"> {student_id} </p>
                </div>
            </div>
        ]
    }
}

class StudentManagementPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return (
            <div id="student_manage_page" className="h-[75vh] flex flex-col gap-5 relative transition-all duration-1000 overflow-hidden">
                <div className="h-max-[65vh] hidden" id="main_part">
                    <p className="text-center pb-5 w-full text-2xl italic text-gray-500"> 《暫時沒有學生》 </p> 
                </div>
                <div className="h-max-[65vh] overflow-y-auto" id="main_part">
                    <div className="grid grid-cols-5 gap-5">
                        <StudentCard student_course="資工碩二" student_id="109598044" student_name="葉勝偉" student_role="TA" student_avater="https://picsum.photos/seed/109598044/300/"/>
                        <StudentCard student_course="資工三" student_id="109590077" student_name="歐陽士傑" student_role="student" student_avater="https://picsum.photos/seed/109590077/300/"/>
                    </div>
                </div>
                <hr />
                <div id="button_part">
                    <button className="p-3 w-full bg-amber-500 hover:bg-amber-400 transition-all duration-300 rounded-lg text-white text-lg"> 新增學生 </button>
                </div>
            </div>
        )
    }
}

class TeacherPlatform extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
        this.logout = this.logout.bind(this)
        this.pageSwitch = this.pageSwitch.bind(this)
    }
    componentDidMount(){
        /* Chart Render */
        const data1 = {
            labels: ["繳交", "未繳交"],
            datasets: [{
                data: [30, 70],
                backgroundColor: [
                    'rgb(102, 187, 106)',
                    'rgb(239, 83, 80)'
                ],
                hoverOffset: 4
            }]
        }
        const data2 = {
            labels: ["預警", "未預警"],
            datasets: [{
                data: [15, 85],
                backgroundColor: [
                    'rgb(38, 198, 218)',
                    'rgb(239, 83, 80)'
                ],
                hoverOffset: 4
            }]
        }
        new Chart(document.getElementById("chart1"), {type: 'doughnut', data: data1, options: {}});
        new Chart(document.getElementById("chart2"), {type: 'doughnut', data: data2, options: {}});
    }
    logout(){
        $.ajax({
            url: "/logout",
            type: "POST",
            success(data, status, xhr){
                if(data["status"] == "OK"){
                    success_swal("登出成功！").then(() => {window.location.href = "/"})
                }else{
                    error_swal("登出失敗", data["code"])
                }
            }
        })
    }
    pageSwitch(event){
        page = ["main_page", "student_manage_page"]
        button = ["main", "student_manage"]

        for(let i = 0; i < button.length; i++){
            if(event.target.id === button[i]){
                document.getElementById(button[i]).classList.add("bg-cyan-200")
            }else{
                document.getElementById(button[i]).classList.remove("bg-cyan-200")
            }
        }

        for(let i = 0; i < page.length; i++){
            if(event.target.id + "_page" === page[i]){
                document.getElementById(page[i]).classList.add("h-[75vh]")
                document.getElementById(page[i]).classList.remove("h-0")
            }else{
                document.getElementById(page[i]).classList.remove("h-[75vh]")
                document.getElementById(page[i]).classList.add("h-0")
            }
        }
    }
    render(){
        let app = (
            <div className="flex flex-row gap-5">
                <div className="w-[20%] h-[95vh] bg-white rounded p-10 block overflow-y-aut">
                    <p className="text-center text-4xl font-['Mochiy_Pop_One'] pb-12"> 成績管理系統 </p>
                    <div id="course-option" className="flex flex-col h-fit gap-10">
                        <button id="main" className="text-center text-xl hover:bg-cyan-200 cursor-pointer p-2 rounded-full transition-all duration-200 bg-cyan-200" onClick={this.pageSwitch}> 主頁 </button>
                        <button id="student_manage" className="text-center text-xl hover:bg-cyan-200 cursor-pointer p-2 rounded-full transition-all duration-200" onClick={this.pageSwitch}> 管理班級人員 </button>
                        <button className="text-center text-xl hover:bg-cyan-200 cursor-pointer p-2 rounded-full transition-all duration-200"> 管理功課 </button>
                        <button className="text-center text-xl hover:bg-cyan-200 cursor-pointer p-2 rounded-full transition-all duration-200"> 管理成績 </button>
                        <button className="text-center text-xl hover:bg-cyan-200 cursor-pointer p-2 rounded-full transition-all duration-200"> 查看事件 </button>
                        <button className="text-center text-xl hover:bg-cyan-200 cursor-pointer p-2 rounded-full transition-all duration-200"> 學生私訊 </button>
                        <button className="text-center text-xl hover:bg-cyan-200 cursor-pointer p-2 rounded-full transition-all duration-200" onClick={this.logout}> 登出 </button>
                    </div>
                </div>
                <div className="w-[60%] h-[95vh] bg-white rounded p-10 block">
                    <div id="title">
                        <p className="text-4xl font-['Mochiy_Pop_One'] pb-5"> 成績管理系統開發與實作 </p>
                        <p className="text-xl font-['Mochiy_Pop_One'] pb-5"> 北科高中資工二乙 </p>
                        <hr className="pb-5" />
                    </div>
                    <div id="page" className="h-[75vh] block overflow-y-hidden">
                        <div className="h-[200%]">
                            <MainPage />
                            <StudentManagementPage />
                        </div>
                    </div>
                </div>
                <div className="w-[20%] h-[95vh] rounded flex flex-col gap-5">
                    <div className="w-full h-[15%] bg-white rounded p-5 text-center">
                        <div className="relative left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                            <Clock date_format="yyyy/MM/dd" time_format="HH:mm:ss" />
                        </div>
                    </div>
                    <div className="w-full h-[85%] bg-white rounded p-5">
                        <p className="text-center text-xl p-5"> 最新事件 </p>
                        <div className="h-[67vh] rounded flex flex-col gap-7">
                            <div className="card w-full h-fit p-5 py-8 border-2 rounded shadow-md cursor-pointer hover:bg-slate-100">
                                <p className="text-xl"> 學生私訊 #1 </p>
                                <p className="text-sm pt-2"> 主旨：功課詢問 </p>
                                <p className="text-sm pt-2"> 發送時間：2022/08/01 22:35 </p>
                            </div>
                            <div className="card w-full h-fit p-5 py-8 border-2 rounded shadow-md cursor-pointer hover:bg-slate-100">
                                <p className="text-xl"> HW#1 - 作業進度 </p>
                                <p className="text-sm pt-2"> 繳交：63/64 </p>
                                <p className="text-sm pt-2"> 期限：2022/08/24 </p>
                            </div>
                            <div className="card w-full h-fit p-5 py-8 border-2 rounded shadow-md cursor-pointer hover:bg-slate-100">
                                <p className="text-xl"> HW#2 - 作業進度 </p>
                                <p className="text-sm pt-2"> 繳交：22/64 </p>
                                <p className="text-sm pt-2"> 期限：2022/09/01 </p>
                            </div>
                            <div className="card w-full h-fit p-5 border-2 rounded shadow-md cursor-pointer hover:bg-slate-100">
                                <p className="text-center text-xl"> 查看全部 </p>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
        return app;
    }
}

const root = ReactDOM.createRoot(document.getElementById("app"))
root.render(<TeacherPlatform />)