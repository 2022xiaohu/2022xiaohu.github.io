        
        //格式化日期
        function formatDate(date, format) {
            const map = {
                mm: date.getMonth() + 1,
                dd: date.getDate(),
                yy: date.getFullYear().toString().slice(-2),
                yyyy: date.getFullYear()
            }

            return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
        }

        //返回两位数天数
        var checkDay = function (i) {

            if (i < 10) {
        
                i = "0" + i;
        
            }
        
            return i;
        
        }

        // 获取最近几个交易日日期
        //day 获取日期的最后一天
        function _history_date(day) {
            var m_data = []
            $.ajax({
                url: '/history_date',
                data: {
                    data: day
                },
                type: 'POST',
                async: false,
                dataType: 'json',
                // contentType: 'application/json; charset=UTF-8',
                success: function (data) {
                    m_data = data['date'];
                    console.log(data);
                    // update_table(data)
                },
                error: function (msg) {
                    console.log(msg);
                }
            })
            return m_data;
        };


        // 获取最近几个交易日日期
        function _history_date_eastmoney() {
            var m_data = []
            $.ajax({
                url: '/history_date',
                type: 'GET',
                async: false,
                dataType: 'json',
                // contentType: 'application/json; charset=UTF-8',
                success: function (data) {
                    // m_data = data['date'];
                    console.log('.............'+data);
                    // update_table(data)
                },
                error: function (msg) {
                    console.log(msg);
                }
            })
            return m_data;
        };

        //*   功能： 修改 window.setInterval ，使之可以传递参数和对象参数    
        //*   方法： setInterval (回调函数,时间,参数1,,参数n)  参数可为对象:如数组等
        //*============================================================= 
        var __sto = setInterval;
        window.setInterval = function (callback, timeout, param) {
            var args = Array.prototype.slice.call(arguments, 2);
            var _cb = function () {
                callback.apply(null, args);
            }
            return __sto(_cb, timeout);
        }
        //window.setInterval(hello,3000,userName);


        var ID_THREAD = -1;

         //获取当前日期
        function getDate() {
            var d = new Date();
            var m_date = d.getFullYear() + "-" + formatZero(String(parseInt(d.getMonth()) + 1)) + "-" + formatZero(d.getDate());
            return m_date;
        }

        //格式化日期时间
        function formatZero(n) {
            if (n >= 0 && n <= 9) {
                return "0" + n;
            } else {
                return n;
            }
        }

        function get_time() {
            //获取当前时间
            var d = new Date();
            var m_date = d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
            var date = d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds()
            // 判断时间是否在开盘时间段
            if (date >= (9 * 60 * 60 + 15 * 60) && date <= (11 * 60 * 60 + 30 * 60) || date >= (13 * 60 * 60)&&(15 * 60 * 60+30*60) >= date ) {
                return true;
            } else {
                return false;
            }
        }

        function is_running(Func) {
            console.log(new Date().toLocaleString()+' runing...');
            if (get_time()) { //时间匹配
                console.log('runing...');
                Func()
                return true;
            } else {
                return false;
            }
        }

        // function auto_update(Func) {
        //     Func()
        //     date = getDate()
        //     _date = historyDateEastmoney()
        //     _date = _date[_date.length-1]
            
        //     if (date == _date) {
        //         ID_THREAD = setInterval(is_running, 1000 * 3, Func); //指定3秒刷新一次
        //     } else {
        //         if (ID_THREAD != -1) {
        //             clearInterval(ID_THREAD)
        //         }
        //     }
        //     return ID_THREAD
        // }


        function auto_update(Func) {
            Func()
            var d = new Date();
            var n = d.getDay();
            
            if (n != 0 && n != 6) {
                ID_THREAD = setInterval(is_running, 1000 * 3, Func); //指定3秒刷新一次
            } else {
                if (ID_THREAD != -1) {
                    clearInterval(ID_THREAD)
                }
            }
            return ID_THREAD
        }
        
        // 获取交易日日期
        function get_server_data() {
            var m_data = []
            $.ajax({
                url: '/get_now_limit',
                data: {},
                type: 'GET',
                async: false,
                dataType: 'json',
                success: function (data) {
                    m_data = data;
                },
                error: function (msg) {
                    console.log(msg);
                }
            })
            return m_data;
        };
        
        function format_money(money) {
            //金钱转换
            if (money > 0) {
                if (money / 10000 > 10000) {
                    return (money / 100000000).toFixed(2) + "亿"
                } else if (money / 10000 > 1) {
                    return (money / 10000).toFixed(0) + "万"
                }
            } else {
                money = Math.abs(money);
                if (money / 10000 > 10000) {
                    return "-" + (money / 100000000).toFixed(2) + "亿"
                } else if (money / 10000 > 1) {
                    return "-" + (money / 10000).toFixed(0) + "万"
                }
            }
        }

        function format_date(data) {
            //格式化日期 (data=时间戳)
            new Date(parseInt(data) * 1000)
            var h = addZero(data.getHours());
            var m = addZero(data.getMinutes());
            var s = addZero(data.getSeconds());
            return h + ":" + m + ":" + s;
    
            function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
        }

       // 获取最近几个交易日日期
       function historyDateEastmoney() {
        var m_data = []
        $.ajax({
            url: 'https://push2his.eastmoney.com/api/qt/stock/kline/get?cb=jQuery351020143393668275844_1674273725401&secid=1.000001&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1&fields2=f51&klt=101&fqt=1&end=20500101&lmt=1000000&_=1674273725455 ',
            type: 'GET',
            async: false,//同步
            dataType: 'text',
            // contentType: 'application/json; charset=UTF-8',
            success: function (data) {
                // var data = eval('(' + data + ')')['klines'];
                // console.log(data);
                var regex3 = /\{\"code\".*\]\}/  // {} 花括号，大括号
                data = data.match(regex3)[0]
                data = JSON.parse(data)["klines"]//JSON格式化
                // console.log(data);
                m_data = data
            },
            error: function (msg) {
                console.log(msg);
            }
        })
        return  m_data
    };  
