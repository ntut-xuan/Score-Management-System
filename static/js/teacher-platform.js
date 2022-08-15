var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clock = function (_React$Component) {
    _inherits(Clock, _React$Component);

    function Clock(props) {
        _classCallCheck(this, Clock);

        var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this, props));

        _this.state = {
            date_string: "",
            time_string: "",
            time_format: props.time_format,
            date_format: props.date_format
        };
        return _this;
    }

    _createClass(Clock, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var _state = this.state,
                time_format = _state.time_format,
                date_format = _state.date_format;

            this.timer_id = setInterval(function () {
                time_string = luxon.DateTime.now().setZone("Asia/Taipei").toFormat(time_format);
                date_string = luxon.DateTime.now().setZone("Asia/Taipei").toFormat(date_format);
                _this2.setState({ time_string: time_string, date_string: date_string });
            }, 500);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.timer_id);
        }
    }, {
        key: "render",
        value: function render() {
            var _state2 = this.state,
                date_string = _state2.date_string,
                time_string = _state2.time_string;

            return [React.createElement(
                "p",
                { className: "text-4xl py-1 font-['Airborne']" },
                " ",
                date_string,
                " "
            ), React.createElement(
                "p",
                { className: "text-4xl py-1 font-['Airborne']" },
                " ",
                time_string,
                " "
            )];
        }
    }]);

    return Clock;
}(React.Component);

var TeacherPlatform = function (_React$Component2) {
    _inherits(TeacherPlatform, _React$Component2);

    function TeacherPlatform(props) {
        _classCallCheck(this, TeacherPlatform);

        var _this3 = _possibleConstructorReturn(this, (TeacherPlatform.__proto__ || Object.getPrototypeOf(TeacherPlatform)).call(this, props));

        _this3.state = {};
        _this3.logout = _this3.logout.bind(_this3);
        return _this3;
    }

    _createClass(TeacherPlatform, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            /* Chart Render */
            var data1 = {
                labels: ["繳交", "未繳交"],
                datasets: [{
                    data: [30, 70],
                    backgroundColor: ['rgb(102, 187, 106)', 'rgb(239, 83, 80)'],
                    hoverOffset: 4
                }]
            };
            var data2 = {
                labels: ["預警", "未預警"],
                datasets: [{
                    data: [15, 85],
                    backgroundColor: ['rgb(38, 198, 218)', 'rgb(239, 83, 80)'],
                    hoverOffset: 4
                }]
            };
            new Chart(document.getElementById("chart1"), { type: 'doughnut', data: data1, options: {} });
            new Chart(document.getElementById("chart2"), { type: 'doughnut', data: data2, options: {} });
        }
    }, {
        key: "logout",
        value: function logout() {
            $.ajax({
                url: "/logout",
                type: "POST",
                success: function success(data, status, xhr) {
                    if (data["status"] == "OK") {
                        success_swal("登出成功！").then(function () {
                            window.location.href = "/";
                        });
                    } else {
                        error_swal("登出失敗", data["code"]);
                    }
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var app = React.createElement(
                "div",
                { className: "flex flex-row gap-5" },
                React.createElement(
                    "div",
                    { className: "w-[20%] h-[95vh] bg-white rounded p-10 block overflow-y-auto" },
                    React.createElement(
                        "p",
                        { className: "text-center text-4xl font-['Mochiy_Pop_One'] pb-12" },
                        " \u6210\u7E3E\u7BA1\u7406\u7CFB\u7D71 "
                    ),
                    React.createElement(
                        "div",
                        { id: "course-option", className: "flex flex-col h-fit gap-10" },
                        React.createElement(
                            "button",
                            { className: "text-center text-xl hover:bg-cyan-200 cursor-pointer p-2 rounded-full transition-all duration-200 bg-cyan-200" },
                            " \u4E3B\u9801 "
                        ),
                        React.createElement(
                            "button",
                            { className: "text-center text-xl hover:bg-cyan-200 cursor-pointer p-2 rounded-full transition-all duration-200" },
                            " \u7BA1\u7406\u73ED\u7D1A\u4EBA\u54E1 "
                        ),
                        React.createElement(
                            "button",
                            { className: "text-center text-xl hover:bg-cyan-200 cursor-pointer p-2 rounded-full transition-all duration-200" },
                            " \u7BA1\u7406\u529F\u8AB2 "
                        ),
                        React.createElement(
                            "button",
                            { className: "text-center text-xl hover:bg-cyan-200 cursor-pointer p-2 rounded-full transition-all duration-200" },
                            " \u7BA1\u7406\u6210\u7E3E "
                        ),
                        React.createElement(
                            "button",
                            { className: "text-center text-xl hover:bg-cyan-200 cursor-pointer p-2 rounded-full transition-all duration-200" },
                            " \u67E5\u770B\u4E8B\u4EF6 "
                        ),
                        React.createElement(
                            "button",
                            { className: "text-center text-xl hover:bg-cyan-200 cursor-pointer p-2 rounded-full transition-all duration-200" },
                            " \u5B78\u751F\u79C1\u8A0A "
                        ),
                        React.createElement(
                            "button",
                            { className: "text-center text-xl hover:bg-cyan-200 cursor-pointer p-2 rounded-full transition-all duration-200", onClick: this.logout },
                            " \u767B\u51FA "
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "w-[60%] h-[95vh] bg-white rounded p-10 block overflow-y-auto" },
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "p",
                            { className: "text-4xl font-['Mochiy_Pop_One'] pb-5" },
                            " \u6210\u7E3E\u7BA1\u7406\u7CFB\u7D71\u958B\u767C\u8207\u5BE6\u4F5C "
                        ),
                        React.createElement(
                            "p",
                            { className: "text-xl font-['Mochiy_Pop_One'] pb-5" },
                            " \u5317\u79D1\u9AD8\u4E2D\u8CC7\u5DE5\u4E8C\u4E59 "
                        ),
                        React.createElement("hr", { className: "pb-5" }),
                        React.createElement(
                            "div",
                            { className: "h-[72.6vh] flex flex-row gap-5" },
                            React.createElement(
                                "div",
                                { className: "w-[35%] border-2 p-5 py-5" },
                                React.createElement(
                                    "p",
                                    { className: "text-center pb-5 text-xl" },
                                    " \u73ED\u7D1A\u4EBA\u54E1\u5217\u8868 "
                                ),
                                React.createElement(
                                    "div",
                                    { className: "flex flex-col gap-5 h-[63vh] overflow-y-auto" },
                                    React.createElement(
                                        "div",
                                        { className: "p-5 bg-blue-200 rounded hover:bg-blue-100 cursor-pointer" },
                                        React.createElement(
                                            "p",
                                            { className: "text-xl" },
                                            " \u5947\u602A\u7684\u4EBA "
                                        ),
                                        React.createElement(
                                            "p",
                                            { className: "text-sm pt-2" },
                                            " \u8CC7\u5DE5\u78A9\u4E8C - 109598091 "
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "p-5 bg-orange-200 rounded hover:bg-orange-100 cursor-pointer" },
                                        React.createElement(
                                            "p",
                                            { className: "text-xl" },
                                            " \u67D0\u500B\u4EBA "
                                        ),
                                        React.createElement(
                                            "p",
                                            { className: "text-sm pt-2" },
                                            " \u8CC7\u5DE5\u4E8C - 109590091 "
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "p-5 bg-orange-200 rounded hover:bg-orange-100 cursor-pointer" },
                                        React.createElement(
                                            "p",
                                            { className: "text-xl" },
                                            " \u67D0\u500B\u4EBA "
                                        ),
                                        React.createElement(
                                            "p",
                                            { className: "text-sm pt-2" },
                                            " \u8CC7\u5DE5\u4E8C - 109590091 "
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "p-5 bg-orange-200 rounded hover:bg-orange-100 cursor-pointer" },
                                        React.createElement(
                                            "p",
                                            { className: "text-xl" },
                                            " \u67D0\u500B\u4EBA "
                                        ),
                                        React.createElement(
                                            "p",
                                            { className: "text-sm pt-2" },
                                            " \u8CC7\u5DE5\u4E8C - 109590091 "
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "p-5 bg-orange-200 rounded hover:bg-orange-100 cursor-pointer" },
                                        React.createElement(
                                            "p",
                                            { className: "text-xl" },
                                            " \u67D0\u500B\u4EBA "
                                        ),
                                        React.createElement(
                                            "p",
                                            { className: "text-sm pt-2" },
                                            " \u8CC7\u5DE5\u4E8C - 109590091 "
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "p-5 bg-orange-200 rounded hover:bg-orange-100 cursor-pointer" },
                                        React.createElement(
                                            "p",
                                            { className: "text-xl" },
                                            " \u67D0\u500B\u4EBA "
                                        ),
                                        React.createElement(
                                            "p",
                                            { className: "text-sm pt-2" },
                                            " \u8CC7\u5DE5\u4E8C - 109590091 "
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "w-[65%] flex flex-col gap-5" },
                                React.createElement(
                                    "div",
                                    { className: "h-[45%] border-2 p-5" },
                                    React.createElement(
                                        "p",
                                        { className: "text-center pb-5 text-xl" },
                                        " \u8FD1\u671F\u5169\u6B21\u4F5C\u696D "
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "flex flex-row gap-5" },
                                        React.createElement(
                                            "div",
                                            { className: "p-5 bg-red-200 rounded h-full w-[50%] hover:bg-red-100 cursor-pointer" },
                                            React.createElement(
                                                "p",
                                                { className: "text-xl" },
                                                " \u4F5C\u696D #1 "
                                            ),
                                            React.createElement(
                                                "p",
                                                { className: "text-sm pt-3" },
                                                " \u7531 [\u5947\u602A\u7684\u4EBA] \u6307\u6D3E "
                                            ),
                                            React.createElement(
                                                "p",
                                                { className: "text-sm pt-3" },
                                                " \u7E73\u4EA4\u4EBA\u6578\uFF1A63/64 "
                                            ),
                                            React.createElement(
                                                "p",
                                                { className: "text-sm pt-3" },
                                                " \u7E73\u4EA4\u671F\u9650\uFF1A2022/08/24 "
                                            )
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "p-5 bg-red-200 rounded h-full w-[50%] hover:bg-red-100 cursor-pointer" },
                                            React.createElement(
                                                "p",
                                                { className: "text-xl" },
                                                " \u4F5C\u696D #2 "
                                            ),
                                            React.createElement(
                                                "p",
                                                { className: "text-sm pt-3" },
                                                " \u7531 [\u5947\u602A\u7684\u4EBA] \u6307\u6D3E "
                                            ),
                                            React.createElement(
                                                "p",
                                                { className: "text-sm pt-3" },
                                                " \u7E73\u4EA4\u4EBA\u6578\uFF1A22/64 "
                                            ),
                                            React.createElement(
                                                "p",
                                                { className: "text-sm pt-3" },
                                                " \u7E73\u4EA4\u671F\u9650\uFF1A2022/09/01 "
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "h-[55%] border-2 p-5" },
                                    React.createElement(
                                        "p",
                                        { className: "text-center text-xl pb-5" },
                                        " \u7D71\u8A08\u6578\u64DA "
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "flex flex-row gap-5 justify-center" },
                                        React.createElement(
                                            "div",
                                            { className: "rounded h-fit w-full border-2 p-5" },
                                            React.createElement(
                                                "p",
                                                { className: "text-center" },
                                                " \u8FD1\u4E00\u6B21\u7E73\u4EA4\u529F\u8AB2\u60C5\u6CC1 "
                                            ),
                                            React.createElement(
                                                "div",
                                                { className: "rounded h-full w-[81%] mx-auto" },
                                                React.createElement("canvas", { className: "w-full h-full", id: "chart1" })
                                            )
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "rounded h-fit w-full border-2 p-5" },
                                            React.createElement(
                                                "p",
                                                { className: "text-center" },
                                                " \u73ED\u7D1A\u9810\u8B66\u5B78\u751F\u6BD4\u4F8B "
                                            ),
                                            React.createElement(
                                                "div",
                                                { className: "rounded h-full w-[81%] mx-auto" },
                                                React.createElement("canvas", { className: "w-full h-full", id: "chart2" })
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "w-[20%] h-[95vh] rounded flex flex-col gap-5" },
                    React.createElement(
                        "div",
                        { className: "w-full h-[15%] bg-white rounded p-5 text-center" },
                        React.createElement(
                            "div",
                            { className: "relative left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" },
                            React.createElement(Clock, { date_format: "yyyy/MM/dd", time_format: "HH:mm:ss" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "w-full h-[85%] bg-white rounded p-5" },
                        React.createElement(
                            "p",
                            { className: "text-center text-xl p-5" },
                            " \u6700\u65B0\u4E8B\u4EF6 "
                        ),
                        React.createElement(
                            "div",
                            { className: "h-[67vh] rounded flex flex-col gap-7" },
                            React.createElement(
                                "div",
                                { className: "card w-full h-fit p-5 py-8 border-2 rounded shadow-md cursor-pointer hover:bg-slate-100" },
                                React.createElement(
                                    "p",
                                    { className: "text-xl" },
                                    " \u5B78\u751F\u79C1\u8A0A #1 "
                                ),
                                React.createElement(
                                    "p",
                                    { className: "text-sm pt-2" },
                                    " \u4E3B\u65E8\uFF1A\u529F\u8AB2\u8A62\u554F "
                                ),
                                React.createElement(
                                    "p",
                                    { className: "text-sm pt-2" },
                                    " \u767C\u9001\u6642\u9593\uFF1A2022/08/01 22:35 "
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "card w-full h-fit p-5 py-8 border-2 rounded shadow-md cursor-pointer hover:bg-slate-100" },
                                React.createElement(
                                    "p",
                                    { className: "text-xl" },
                                    " HW#1 - \u4F5C\u696D\u9032\u5EA6 "
                                ),
                                React.createElement(
                                    "p",
                                    { className: "text-sm pt-2" },
                                    " \u7E73\u4EA4\uFF1A63/64 "
                                ),
                                React.createElement(
                                    "p",
                                    { className: "text-sm pt-2" },
                                    " \u671F\u9650\uFF1A2022/08/24 "
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "card w-full h-fit p-5 py-8 border-2 rounded shadow-md cursor-pointer hover:bg-slate-100" },
                                React.createElement(
                                    "p",
                                    { className: "text-xl" },
                                    " HW#2 - \u4F5C\u696D\u9032\u5EA6 "
                                ),
                                React.createElement(
                                    "p",
                                    { className: "text-sm pt-2" },
                                    " \u7E73\u4EA4\uFF1A22/64 "
                                ),
                                React.createElement(
                                    "p",
                                    { className: "text-sm pt-2" },
                                    " \u671F\u9650\uFF1A2022/09/01 "
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "card w-full h-fit p-5 border-2 rounded shadow-md cursor-pointer hover:bg-slate-100" },
                                React.createElement(
                                    "p",
                                    { className: "text-center text-xl" },
                                    " \u67E5\u770B\u5168\u90E8 "
                                )
                            )
                        )
                    )
                )
            );
            return app;
        }
    }]);

    return TeacherPlatform;
}(React.Component);

var root = ReactDOM.createRoot(document.getElementById("app"));
root.render(React.createElement(TeacherPlatform, null));