        
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

        function get_date() {
            //获取当前日期
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
            if (date >= (9 * 60 * 60 + 15 * 60) && date <= (11 * 60 * 60 + 30 * 60) || date >= (13 * 60 * 60)&&(15 * 60 * 60) >= date ) {
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

        function auto_update(Func) {
            Func()
            data = get_server_data();
            if (get_date() == data.day) {
                ID_THREAD = setInterval(is_running, 1000 * 3, Func); //指定3秒刷新一次
            } else {
                if (ID_THREAD != -1) {
                    clearInterval(ID_THREAD)
                }
            }
            return ID_THREAD
        }
        // 获取现在涨停的股票池
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
        /*
        获取大盘分时数据
        */
        function getTrend(market, code) {
            var m_data = []
            $.ajax({
                url: '/tline',
                data: {
                    market: market,
                    code: code
                },
                type: 'POST',
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

        /*
        获取个股分时数据
        */
        function getStockTrend(code) {
            var m_data = []
            $.ajax({
                url: '/stock_trend',
                data: {
                    date: code
                },
                type: 'POST',
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

        /*
        获取K线数据
        */
        function getKline(code) {
            var m_data = []
            $.ajax({
                url: '/kline',
                data: {
                    code: code,
                    market: 0
                },
                type: 'POST',
                async: false,
                dataType: 'json',
                success: function (data) {
                    // var x_data = data['x'];
                    // var y_data = data['y'];
                    // var vol_data = data['vol'];
                    // for (var i = 0; i < x_data.length; i++) {
                    //     m_data.push([x_data[i], y_data[i][0], y_data[i][1], y_data[i][2], y_data[i][3], vol_data[i]])
                    // }
                    m_data = data['data'];
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

        // 获取股票涨幅数据
        function get_rise_data(codes) {
            var m_data = []
            $.ajax({
                url: '/codes_rise',
                data: JSON.stringify({
                    data: codes
                }),
                type: 'POST',
                async: true, //异步加载
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                success: function(data) {
                    m_data = data;
                    console.log(data);
                },
                error: function(msg) {
                    console.log(msg);
                }
            })
            return m_data;
        };        