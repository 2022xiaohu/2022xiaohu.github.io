

/*------------------公共部分------------------------*/

var $_ = (function () {

    var $_ = {};
    $_.isFocus = true;//当前页面处于焦点

    //---------------------测试-----------------
    //$_.reqUrl = 'http://pctest.kaipanla.com/index.php/';
    //$_.reqUrl1 = 'https://lhb.kaipanla.com/w1/api/index.php?apiv=w4';//开盘啦

    //$_.reqUrl2 = 'http://pckf.kaipanla.com/articlew1/api/index.php';//文章
    //$_.reqUrl3 = 'http://pckf.kaipanla.com/lhbw1/api/index.php';//自选股部分
    //$_.reqUrl4 = 'http://pckf.kaipanla.com/hqw1/api/index.php';//行情部分
    //$_.reqUrl5 = 'http://pckf.kaipanla.com/hisw1/api/index.php';//k线部分
    //$_.reqUrl6 = 'https://pcpx.kaipanla.com/api/index.php';//

    //$_.pageUrl = 'http://pctest.kaipanla.com/';//页面
    //$_.fileUrl = $_.pageUrl + 'pc/';
    //$_.imgUrl = $_.pageUrl + 'pc/img/';

    //$_.pageUrl = 'http://localhost:49694/';//页面
    //$_.fileUrl = $_.pageUrl;
    //$_.imgUrl = $_.pageUrl + 'img/';

    //---------------------正式-----------------

    $_.reqUrl = 'https://www.kaipanla.com/index.php/';
    $_.reqUrl2 = 'https://pcarticle.kaipanla.com/w1/api/index.php';//文章
    $_.reqUrl3 = 'https://pclhb.kaipanla.com/w1/api/index.php';//龙虎榜
    $_.reqUrl4 = 'https://pchq.kaipanla.com/w1/api/index.php';//行情部分
    $_.reqUrl5 = 'https://pchis.kaipanla.com/w1/api/index.php';//k线部分
    $_.reqUrl6 = 'https://pcpx.kaipanla.com/api/index.php';//

    $_.pageUrl = 'https://www.kaipanla.com/';//页面
    $_.fileUrl = $_.pageUrl + 'pc/';
    $_.imgUrl = $_.pageUrl + 'pc/img/';

    ////本地测试
    //$_.pageUrl = 'http://localhost:49694/';//页面
    //$_.fileUrl = $_.pageUrl;
    //$_.imgUrl = $_.pageUrl + 'img/';

    //----------------------------------------------------------------

    //ajax请求
    $_.ajax = function (param) {
        //param = {
        //    url: '',
        //    data: {},
        //    type: 'POST',
        //    dataType:'JSON',
        //    suc: function () { },
        //    berro: function () { },
        //    err: function () { },
        //    loginF: function () { }
        //};

        //$_.ajax({
        //    url: $_.reqUrl + 'login/polling_user',
        //    data: {},
        //    suc: function (Json) { },
        //    berro: function (Json) { },
        //    err: function () { }
        //});

        var headers = {};
        if (param.headers) headers = param.headers;

        param.data = param.data ? param.data : {};
        var uid = localStorage.getItem('user_UserID'),
            token = localStorage.getItem('user_token');

        if (param.url.indexOf($_.reqUrl) > -1) {
            param.data.userid = uid ? uid : '';
            param.data.token = token ? token : '';
        }
        else {
            param.data.UserID = uid ? uid : '';
            param.data.Token = token ? token : '';
        }

        //param.data.client = 'web';

        var rData = {
            headers: headers,
            type: param.type ? param.type : 'POST',
            url: param.url,
            data: param.data,
            dataType: param.dataType ? param.dataType : 'JSON',
            timeout: 200000,//20秒超时
            success: function (Json) {
                if (Json.errcode == 0) {
                    if (param.suc) param.suc(Json);
                }
                else {
                    if (param.berro) param.berro(Json);
                    if (Json.errcode == '1001') {

                        //alert('登录失效：' + param.data.userid + '-' + param.data.token);

                        //return;

                        if (param.loginF) param.loginF();
                        else if (window.login_) login_.loginInvalid();

                        if (window.login_) login_.openDialog('code', { allow_claose: false });
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (param.err && textStatus != 'abort') param.err(XMLHttpRequest, textStatus, errorThrown);
            }
        };

        if (param.other) {
            for (var i in param.other) rData[i] = param.other[i];
        }

        return $.ajax(rData);
    };

    //获取传递参数
    $_.GetQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return r[2];
        return null;
    };

    //cookie操作
    $_.cookie = {
        set: function (name, val, millisecond, other) {

            var CookieStr = name + "=" + escape(val) + ';';

            other = other || {};

            if (other.path == undefined) other.path = '/';
            //if (other.domain == undefined) other.domain = '.'+location.host.split(':')[0];
            //console.log(other.domain, location.host);

            for (var i in other) {
                CookieStr += i + '=' + other[i] + ';';
            }

            if (millisecond) {
                var exp = new Date();
                exp.setTime(exp.getTime() + millisecond);
                CookieStr += "expires=" + exp.toGMTString() + ';';

                //console.log(millisecond, exp, CookieStr);
            }
            document.cookie = CookieStr;
        },
        get: function (name) {

            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            }
            else {
                return null;
            }
        }
    };

    //获取日期
    $_.Date = {
        getDates: function (DateTime, use_UTC_GMT_8) {

            //use_UTC_GMT_8 是否需要转换东八时区 默认true
            use_UTC_GMT_8 = use_UTC_GMT_8 === false ? false : true;

            var vTime;
            if (DateTime) {
                if (DateTime instanceof Date) vTime = DateTime;
                else if (typeof DateTime === 'number') vTime = new Date(DateTime);
                else if (typeof DateTime === 'string') {
                    vTime = new Date(DateTime.replace(/-/g, '/'));

                    if (use_UTC_GMT_8) {

                        var tm = vTime.getTime();
                        var diff = vTime.getTimezoneOffset() * 60000;
                        var um8 = -8 * 60 * 60 * 1000;
                        var um8Diff = um8 - diff;

                        tm += um8Diff;

                        tm += diff + um8Diff;
                        tm += -um8;

                        vTime = new Date(tm);
                    }
                }
            }
            else {
                vTime = new Date();

                if (use_UTC_GMT_8) {

                    var tm = vTime.getTime();
                    var diff = vTime.getTimezoneOffset() * 60000;
                    tm += diff;
                    tm += 8 * 60 * 60 * 1000;

                    vTime = new Date(tm);
                }
            }

            return vTime;
        },
        getTime: function (DateTime, use_UTC_GMT_8) {
            //获取时间戳
            return $_.Date.getDates(DateTime, use_UTC_GMT_8).getTime();
        },
        getDate: function (DateTime, Type, use_UTC_GMT_8) {
            //获取日期格式
            //Y-M-D h:m:s   

            //use_UTC_GMT_8 是否需要转换东八时区 默认true
            use_UTC_GMT_8 = use_UTC_GMT_8 === false ? false : true;

            var ThisDate = $_.Date.getDates(DateTime, use_UTC_GMT_8);

            if (use_UTC_GMT_8) {
                var tm = ThisDate.getTime();
                var diff = ThisDate.getTimezoneOffset() * 60000;
                tm += diff;
                tm += 8 * 60 * 60 * 1000;

                ThisDate = new Date(tm);
            }

            if (!Type) Type = 'Y-M-D h:m';

            var Stand = function (val) {
                return val > 9 ? val : ('0' + val);
            };

            var NY, NM, ND, NH, NMi, NS;

            if (Type.indexOf('Y') > -1) {
                NY = ThisDate.getFullYear();
                Type = Type.replace('Y', NY);
            }
            if (Type.indexOf('M') > -1) {
                NM = ThisDate.getMonth() + 1;
                NM = Stand(NM);
                Type = Type.replace('M', NM);
            }
            if (Type.indexOf('D') > -1) {
                ND = ThisDate.getDate();
                ND = Stand(ND);
                Type = Type.replace('D', ND);
            }
            if (Type.indexOf('h') > -1) {
                NH = ThisDate.getHours();
                NH = Stand(NH);
                Type = Type.replace('h', NH);
            }
            if (Type.indexOf('m') > -1) {
                NMi = ThisDate.getMinutes();
                NMi = Stand(NMi);
                Type = Type.replace('m', NMi);
            }
            if (Type.indexOf('s') > -1) {
                NS = ThisDate.getSeconds();
                NS = Stand(NS);
                Type = Type.replace('s', NS);
            }

            return Type;
        },
        addDay: function (Day, DateTime, use_UTC_GMT_8) {
            if (typeof Day != 'number') Day = 0;
            else Day = Math.ceil(Day);
            if (DateTime) {
                if (DateTime instanceof Date) DateTime = DateTime.getTime();//若不取出时间戳再转换时间对象，将会改变原对象
                DateTime = $_.Date.getDates(DateTime);
                DateTime.setDate(DateTime.getDate() + Day);
            }
            else {
                DateTime = new Date();
                DateTime.setDate(DateTime.getDate() + Day);
            }
            return DateTime;
        }
    };

    //获取加载提示Html
    $_.GetLoadTip = function (Type, param) {

        //param = {
        //    cla: '',//盒子class
        //    attr1: '',//盒子属性
        //    attr: '',//内容属性
        //    tip: '',//提示文本
        //    box: '',  //需要填充内容的节点，若存在则在返回前把原对象移除
        //    va:true,//垂直居中
        //};

        if (!param) param = {};

        var Html = '',
            classY = param.cla ? param.cla : '',
            attr = param.attr ? param.attr : '',
            attr1 = param.attr1 ? param.attr1 : '',
            attr2 = param.attr2 ? param.attr2 : '',
            tip = (param.tip || param.tip == '') ? param.tip : false,
            imgurl = param.imgurl ? param.imgurl : $_.imgUrl;

        switch (Type) {
            case 'loading':
                {
                    //列表loading
                    if (param.box) {
                        var chiClass = param.va ? 'v-RowLoading' : 'RowLoading';

                        param.box.children('.' + chiClass).remove();
                    }
                    var Tip_s = tip !== false ? tip : '正在加载...',
                        tclass = 'RowLoading ' + classY;

                    var tipHtml = Tip_s == '' ? '' : ('<span ' + attr + '>' + Tip_s + '</span>');

                    Html = '<div class="' + tclass.trim() + '" ' + attr1 + '>' +
                           '    <img class="ld" src="' + imgurl + 'loading.gif" />' + tipHtml +
                           '</div>';

                    if (param.va) {
                        var classY2 = param.cla2 ? param.cla2 : '',
                        Html = '<div class="v-RowLoading ' + classY2 + '" ' + attr2 + '><div class="v-table">' + Html + '</div></div>';
                    }

                } break;
            case 'vloading':
                {
                    //列表loading2
                    if (param.box) {
                        var chiClass = param.va ? 'v-RowLoading' : 'RowLoading';
                        param.box.children('.' + chiClass).remove();
                    }
                    if (param.box) param.box.children('.RowLoading').remove();
                    var Tip_s = tip !== false ? tip : '正在加载...',
                        tclass = 'RowLoading vloading ' + classY;

                    Html = '<div class="' + tclass.trim() + '" ' + attr1 + '>' +
                           '    <img class="ld" src="' + imgurl + 'loading.png" />' +
                           '    <span ' + attr + '>正在加载...</span>' +
                           '</div>';
                    if (param.va) {
                        var classY2 = param.cla2 ? param.cla2 : '',
                        Html = '<div class="v-RowLoading ' + classY2 + '" ' + attr2 + '><div class="v-table">' + Html + '</div></div>';
                    }
                } break;
            case 'reload':
                {
                    //列表错误提示
                    if (param.box) {
                        var chiClass = param.va ? 'v-RowLoading' : 'RowLoading';
                        param.box.children('.' + chiClass).remove();
                    }
                    var Tip_s = tip !== false ? tip : '网络繁忙，请重试',
                        tclass = 'RowLoading reLoad_tip ' + classY,
                        warning = param.icon === false ? '' : '<img class="war" src="' + imgurl + 'warning.png" />';

                    Html = '<div class="' + tclass.trim() + '" ' + attr1 + '>' + warning +
                           '    <span ' + attr + '>' + Tip_s + '</span>' +
                           '</div>';
                    if (param.va) {
                        var classY2 = param.cla2 ? param.cla2 : '',
                        Html = '<div class="v-RowLoading ' + classY2 + '" ' + attr2 + '><div class="v-table">' + Html + '</div></div>';
                    }
                } break;
            case 'none':
                {
                    //列表无信息提示
                    if (param.box) {
                        var chiClass = param.va ? 'v-RowLoading' : 'RowLoading';
                        param.box.children('.' + chiClass).remove();
                    }
                    var Tip_s = tip !== false ? tip : '暂无任何信息',
                        tclass = 'RowLoading ' + classY;


                    Html = '<div class="' + tclass.trim() + '" ' + attr1 + '>' +
                           '    <span ' + attr + '>' + Tip_s + '</span>' +
                           '</div>';
                    if (param.va) {
                        var classY2 = param.cla2 ? param.cla2 : '',
                        Html = '<div class="v-RowLoading ' + classY2 + '" ' + attr2 + '><div class="v-table">' + Html + '</div></div>';
                    }
                } break;
            case 'done':
                {
                    //列表加载完信息提示
                    if (param.box) {
                        var chiClass = param.va ? 'v-RowLoading' : 'RowLoading';
                        param.box.children('.' + chiClass).remove();
                    }
                    var Tip_s = tip !== false ? tip : '已显示完全部信息',
                        tclass = 'RowLoading ' + classY;

                    Html = '<div class="' + tclass.trim() + '" ' + attr1 + '>' +
                           '    <span ' + attr + '>' + Tip_s + '</span>' +
                           '</div>';
                    if (param.va) {
                        var classY2 = param.cla2 ? param.cla2 : '',
                        Html = '<div class="v-RowLoading ' + classY2 + '" ' + attr2 + '><div class="v-table">' + Html + '</div></div>';
                    }
                } break;
        }



        return Html;

    };

    //获取涨跌幅样式
    $_.getFluctStyle = function (val) {
        val = parseFloat(val);
        if (val > 0) return 'red';
        else if (val < 0) return 'green';
        else return '';
    };

    //Html转义
    $_.HtmlEscape = {
        toText: function (Val) {
            return $('<div></div>').text(Val).html();
        },
        toHtml: function (Val) {
            return $('<div></div>').html(Val).text();
        }
    };

    //大数据单位转换
    $_.changeStand = function (val) {

        if (isNaN(val)) return val;

        var bv = val;
        var mar = bv.toString().indexOf('-') > -1 ? '-' : '';
        val = Math.abs(parseFloat(val));

        //if (val > 999999999999) {
        //    bv = mar + (val / 1000000000000).toFixed(2) + '万亿';
        //}
        //else if (val > 99999999999) {
        //    bv = mar + (val / 100000000000).toFixed(2) + '千亿';
        //}
        //else
        if (val > 99999999) {
            bv = mar + (val / 100000000).toFixed(2) + '亿';
        }
        else if (val > 9999) {
            bv = mar + (val / 10000).toFixed(2) + '万';
        }
        else bv = val.toFixed(2);
        return bv;
    };

    //判断是否能转换为日期
    $_.isDate = function (DateStr) {
        if (typeof DateStr !== 'string') DateStr = '';

        var Dates = new Date(DateStr.replace(/-\./g, "/"));
        var can = false;

        if (Dates == 'Invalid Date') {
            can = false;
        }
        else {
            can = true;
        }
        return can;
    };

    //规范日期格式
    $_.standDateStr = function (val, vf) {

        if (!val || val.length < 8) return val;

        vf = vf || '-';

        val = val.toString().replace(/\.|\//g, vf);

        if (val.indexOf('-') == -1) {
            val = val.substr(0, 4) + vf + val.substr(4, 2) + vf + val.substr(6);
        }
        return val;
    };

    //轮询
    $_.refreshDetail = (function () {

        function _rf(option) {

            //option = {
            //    qFun: fun,//开盘轮询事件
            //    endIsStop: true,//收盘后是否结束轮询
            //};

            var t = this;

            if (!option) option = {};
            var nt = Date.now();
            option.nowTime = nt;

            t.inteTime = option.inteTime || 3000;//轮询间隔
            t.dvNTime = nt;//设备当前时间
            t.startTime = option.nowTime;//初始时间
            t.event = {};//轮询事件

            if (option.qFun) {
                var endIsStop = option.endIsStop === false ? false : true;
                var rTime = option.rTime || null;
                t.add('Quotation_', function () {
                    t.Quotation(option.qFun, endIsStop, { rTime: rTime });
                });
                t.start();
            }
        }

        var pro = _rf.prototype;

        //启动轮询
        pro.start = function () {
            var t = this;

            t.RefreshTimes = 0;

            window.clearInterval(t.mainRefresh);
            t.mainRefresh = setInterval(function () {
                t.RefreshTimes++;
                for (var i in t.event) {
                    t.event[i]();
                }
            }, t.inteTime);
        };
        //停止轮询
        pro.stop = function () {
            window.clearInterval(this.mainRefresh);
        };
        //添加轮询事件
        pro.add = function (funName, fun) {
            this.event[funName] = fun;
        };
        //移除轮询事件
        pro.remove = function (funName) {
            delete this.event[funName];
        };

        //开盘轮询事件
        pro.Quotation = function (fun, endIsStop, param) {

            param = param || {};
            param.rTime = param.rTime || {
                stime1: '09:20',
                etime1: '11:40',
                stime2: '12:50',
                etime2: '15:10'
            };

            //endIsStop 是否收盘后结束全局轮询
            endIsStop = endIsStop == false ? false : true;

            var t = this;
            (function () {
                if (t.Quotation_p) return;
                var today = $_.Date.getDate(t.startTime, 'Y-M-D', false);
                t.Quotation_p = {
                    start1: $_.Date.getTime(today + ' ' + param.rTime.stime1, false),
                    end1: $_.Date.getTime(today + ' ' + param.rTime.etime1, false),
                    start2: $_.Date.getTime(today + ' ' + param.rTime.stime2, false),
                    end2: $_.Date.getTime(today + ' ' + param.rTime.etime2, false)
                };
            })();

            var TDate = $_.Date.getDates();
            if (TDate.getDay() == 0 || TDate.getDay() == 6) return;

            var nTime01 = (TDate.getTime() - t.dvNTime) + t.startTime;

            var is_bf = (function () {
                if (nTime01 < t.Quotation_p.start1 || (nTime01 > t.Quotation_p.end1 && nTime01 < t.Quotation_p.start2)) return true;
                else return false;
            })();
            var is_ing = (function () {
                if ((nTime01 >= t.Quotation_p.start1 && nTime01 <= t.Quotation_p.end1) || (nTime01 >= t.Quotation_p.start2 && nTime01 <= t.Quotation_p.end2)) return true;
                else return false;
            })();
            var is_end = (function () {
                if (nTime01 > t.Quotation_p.end2) return true;
                else return false;
            })();

            if (is_ing) fun();
            else if (is_end) {
                t.remove('Quotation_');
                if (endIsStop) t.stop();
            }
        };

        return _rf;
    })();

    //获取相对窗口位置
    $_.getOffset = {
        top: function (el, stopParent) {

            if (!stopParent) stopParent = document;

            var offset = el.offsetTop;

            if (el.offsetParent != null) {
                if (el.offsetParent === stopParent) offset += el.offsetParent.clientTop;
                else offset += $_.getOffset.top(el.offsetParent, stopParent) + el.offsetParent.clientTop;
            }
            return offset;
        },
        left: function (el, stopParent) {

            if (!stopParent) stopParent = document;

            //console.log(el);

            var offset = el.offsetLeft;

            if (el.offsetParent != null) {

                if (el.offsetParent === stopParent) offset += el.offsetParent.clientLeft;
                else offset += $_.getOffset.left(el.offsetParent, stopParent) + el.offsetParent.clientLeft;

            }
            return offset;
        }
    };

    //获取所有股票
    $_.getAllStock = function (callback, getType) {

        //getType(string)  s获取股票(包含个股、指数) p获取板块 i获取指数  sp pi组合

        if (getType == undefined) getType = 's';

        var reGet = true;
        var getStockLi = getType.indexOf('s') > -1,
            getPlateLi = getType.indexOf('p') > -1,
            getIndexLi = getType.indexOf('i') > -1;
        if (getIndexLi && getStockLi) getIndexLi = false;

        var rg = function (lastUpdataTime) {
            var reGetData = true;

            var nowTime = Date.now(),
                today = $_.Date.getDate(nowTime, 'Y-M-D'),
                todayUpTime = $_.Date.getTime(today + ' 09:05');

            var OldUpTime = parseInt(lastUpdataTime),
                upDay = $_.Date.getDate(OldUpTime, 'Y-M-D');

            if (upDay == today) {
                if (nowTime < todayUpTime) reGetData = false;
                else {
                    if (OldUpTime < todayUpTime) reGetData = true;
                    else reGetData = false;
                }
            }
            else {
                reGetData = true;
            }
            return reGetData;
        };

        //获取缓存股票列表
        var allStockList = function () {
            var asList;

            if ($_.allStcokList_) {
                asList = $_.allStcokList_;
                reGet = false;
            }
            else {
                try {
                    var asInfo = localStorage.getItem('allStock');
                    if (asInfo) {
                        asInfo = JSON.parse(asInfo);
                        if (asInfo.updataTime && asInfo.list) {
                            asList = asInfo.list;
                            reGet = rg(asInfo.updataTime);
                        }
                    }
                }
                catch (e) { }
            }


            return asList;
        };

        //获取缓存板块列表
        var allPlateList = function () {
            var apList;

            if ($_.allPlateList_) {
                apList = $_.allPlateList_;
                reGet = false;
            }
            else {

                try {
                    var asInfo = localStorage.getItem('allStock');
                    if (asInfo) {

                        asInfo = JSON.parse(asInfo);

                        if (asInfo.updataTime && asInfo.pList) {
                            apList = asInfo.pList;

                            reGet = rg(asInfo.updataTime);
                        }
                    }
                }
                catch (e) { }
            }

            return apList;

        };

        //获取缓存指数列表
        var allIndexList = function () {
            var apList;

            if ($_.allIndexList_) {
                apList = $_.allIndexList_;
                reGet = false;
            }
            else {
                try {
                    var asInfo = localStorage.getItem('allStock');
                    if (asInfo) {
                        asInfo = JSON.parse(asInfo);
                        if (asInfo.updataTime && asInfo.iList) {
                            apList = asInfo.iList;
                            reGet = rg(asInfo.updataTime);
                        }
                    }
                }
                catch (e) { }
            }

            return apList;

        };

        //console.log(allIndexList());

        //回调事件
        var exCallback = function (StockList, PlateList, IndexList) {

            if (getStockLi && !getPlateLi && !getIndexLi) callback(0, StockList);
            else if (!getStockLi && !getIndexLi && getPlateLi) callback(0, PlateList);
            else if (!getStockLi && getIndexLi && !getPlateLi) callback(0, IndexList);
            else if (getStockLi && getPlateLi) callback(0, {
                stockList: StockList,
                plateList: PlateList
            });
            else if (getIndexLi && getPlateLi) callback(0, {
                indexList: IndexList,
                plateList: PlateList
            });

        };

        //请求事件
        var reqEvent = function (CBEvent) {
            var Data = { c: 'Stock', a: 'GetSrarchStockMess' };
            $_.ajax({
                url: $_.reqUrl3,
                data: Data,
                suc: function (Json) {

                    var len = Json.List.length,
                        sList = [];
                    for (var i = 0; i < len; i++) {
                        var td = Json.List[i];
                        sList.push({
                            n: td.n,
                            c: td.s,
                            p: td.sp.toLocaleLowerCase()
                        });
                    }
                    var len2 = Json.Plate.length,
                        sList2 = [];
                    for (var i = 0; i < len2; i++) {
                        var td = Json.Plate[i];
                        sList2.push({
                            n: td.n,
                            c: td.s,
                            p: td.sp.toLocaleLowerCase()
                        });
                    }

                    var len3 = Json.Indexs.length,
                        sList3 = [];
                    for (var i = 0; i < len3; i++) {
                        var td = Json.Indexs[i];
                        sList3.push({
                            n: td.n,
                            c: td.s,
                            p: td.sp.toLocaleLowerCase()
                        });
                    }

                    var stockInfo = {
                        pList: sList2,
                        iList: sList3,
                        list: sList,
                        updataTime: Date.now()
                    };
                    localStorage.setItem('allStock', JSON.stringify(stockInfo));
                    $_.allStcokList_ = sList;
                    $_.allPlateList_ = sList2;
                    $_.allIndexList_ = sList3;

                    if (callback) {
                        exCallback(sList, sList2, sList3);
                    }
                },
                berro: function (Json) {
                    if (CBEvent) CBEvent(1, Json.errmsg);
                },
                err: function () {
                    if (CBEvent) CBEvent(1, '网络繁忙');
                }
            });
        }

        var StockList, PlateList, IndexList;
        if (getStockLi) StockList = allStockList();
        if (getPlateLi) PlateList = allPlateList();
        if (getIndexLi) IndexList = allIndexList();

        if (StockList || PlateList || IndexList) {

            if (reGet) reqEvent();
            $_.allStcokList_ = StockList;
            $_.allPlateList_ = PlateList;
            $_.allIndexList_ = IndexList;

            if (callback) {
                exCallback(StockList, PlateList, IndexList);
            }
        }
        else if (getStockLi || getPlateLi || getIndexLi) {
            reqEvent(callback);
        }
    };

    //跳转股票行情页
    $_.ridStockDet = function (sid, type) {
        var url = $_.pageUrl + 'index.php/stock/index?id=' + sid;

        if (type == '_blank') window.open(url, type);
        else window.location.href = url;
    };

    //生成二维码图片
    $_.canvasToPng = function (box, val, param) {

        param = param || {};
        if (param.drawImg !== false) {
            // param.img = param.img || ($_.imgUrl + '40_2.png');
            param.drawImg = true;
        }

        var Temp = $('<div></div>');
        Temp.qrcode({
            text: val,
            render: "canvas",
            width: 180,
            height: 180
        });

        var canvas = Temp.children('canvas')[0];
        var ABT = canvas.getContext('2d');

        var DrawLine = function () {
            if (param.drawImg) ABT.drawImage(BImg, 0, 0, 100, 100, 69, 69, 50, 50);
            var image = new Image();
            image.height = 180;
            image.width = 180;
            image.src = canvas.toDataURL("image/png");
            box.children('img').remove();
            box.append(image);
        };

        if (param.drawImg) {
            var BImg = new Image();
            BImg.crossOrigin = "anonymous";
            BImg.src = param.img;
            if (BImg.complete) {
                DrawLine();
            } else {
                BImg.onload = function () {
                    DrawLine();
                };
            }
        }
        else {
            DrawLine();
        }

    };

    //获取二维码图片
    $_.getCodeImg = function (val) {

        var Temp = $('<div></div>');
        Temp.qrcode({
            text: val,
            render: "canvas",
            width: 180,
            height: 180
        });

        var canvas = Temp.children('canvas')[0];
        var ABT = canvas.getContext('2d');

        return canvas.toDataURL("image/png");
    };

    //获取分享信息
    $_.getShareInfo = function (param) {

        //parma = {
        //    title: '',
        //    content: '',
        //    url:''
        //};

        var s_url_s = param.url,
            s_title = param.title.substr(0, 30),
            s_content = param.content.trim().substr(0, 120),
            s_pic = $_.imgUrl + 'logo001.jpg';

        var s_url = encodeURIComponent(s_url_s);
        s_title = encodeURIComponent(s_title);
        s_content = encodeURIComponent(s_content);
        s_pic = encodeURIComponent(s_pic);

        //微博分享
        var weibo_share = 'http://service.weibo.com/share/share.php?' +
                          '&url=' + s_url +
                          '&title=' + s_title +
                          '&pic=' + s_pic;

        //空间分享
        var qzon_share = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' +
                          'url=' + s_url +
                          '&desc=' + s_content + //分享正文
                          '&summary=' + //分享摘要
                          '&title=' + s_title +   //分享标题
                          '&site=开盘啦' +   //分享来源
                          '&pics=' + s_pic;  //分享图片

        var features = 'width=600, height=600';

        return {
            sina: 'window.open(\'' + weibo_share + '\',\'\',\'' + features + '\')',
            qzone: 'window.open(\'' + qzon_share + '\',\'\',\'' + features + '\')',
            codeImg: $_.getCodeImg(s_url_s)
        };

    };

    //窗口大小改变回调
    $_.resizeWindow = function (addFun,param) {
        param = param || {};
        param.imm = param.imm == false ? false : true;
        //if ($_.resizeWindow_e) console.log($_.resizeWindow_e.length);

        if (typeof addFun === 'function') {
            if (!$_.resizeWindow_e) $_.resizeWindow_e = [];
            $_.resizeWindow_e.push(addFun);
            if (param.imm) addFun(param);
        }
        else if ($_.resizeWindow_e) {
            var len = $_.resizeWindow_e.length;
            for (var i = 0; i < len; i++) $_.resizeWindow_e[i]();
        }
    };

    //获取系统（浏览器）信息
    $_.CheckSystem = {
        //判断安卓系统
        isAndroid: function () {
            var Is = false;
            var ua = navigator.userAgent.toLowerCase();
            if (/android/.test(ua)) {
                Is = true;
            }
            return Is;
        },
        //判断ios系统
        isIos: function () {
            var Is = false;
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                Is = true;
            }
            return Is;
        },
        //判断mac系统
        isMac: function () {
            var Is = false;
            var ua = navigator.userAgent.toLowerCase();
            if (/mac os x/.test(ua)) {
                Is = true;
            }
            return Is;
        },
        //判断是否为微博浏览器
        isWeiBo: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.indexOf('weibo') > -1) {
                return true;
            } else {
                return false;
            }
        },
        //判断是否为微信浏览器
        isWeiXin: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            if (/micromessenger/i.test(ua)) {
                return true;
            } else {
                return false;
            }
        },
        //判断是否为IE浏览器
        isIE: function () {
            if (!!window.ActiveXObject || "ActiveXObject" in window)
                return true;
            else
                return false;
        }

    };

    //是否数值
    $_.isNumber = function (val) {
        // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，

        if (val === "" || val == null) {
            return false;
        }

        if (!isNaN(val)) {
            //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
            //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
            return true;
        }

        else {
            return false;
        }
    }

    return $_;
})();

//数组去重
Array.prototype.unique = function () {
    var res = [];
    var json = {};
    for (var i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
};

//数组多级排序
Array.prototype.mulSort = function (keylist, sType, param) {

    //sType desc降序 asc升序

    param = param || {};
    //param.dataType number比较的值为数值

    var keyLen = keylist.length;
    sType = sType == 'desc' ? 1 : -1;

    this.sort(function (a, b) {

        var tSort = function (key) {
            var a_v = a[key];
            var b_v = b[key];

            var a_in = $_.isNumber(a_v),
                b_in = $_.isNumber(b_v);

            if (a_in && b_in) {
                a_v = parseFloat(a_v);
                b_v = parseFloat(b_v);
            }
            else {
                if (param.dataType == 'number') {
                    //数值与非数值不做比较
                    if (a_in && !b_in) return -1;
                    else if (!a_in && b_in) return 1;
                }
            }

            if (a_v != b_v) {

                var mark;

                if (sType > 0) {
                    //降序
                    if (a_v > b_v) mark = -1;
                    else mark = 1;
                }
                else {
                    //升序

                    if (a_v < b_v) mark = -1;
                    else mark = 1;
                }

                return mark;
            }
            else {
                return 0;
            }
        };

        for (var i = 0; i < keyLen; i++) {
            var key = keylist[i];
            var ts = tSort(key);
            if (ts != 0) return ts;
        }

        return 0;

    });
};

//重写获取当前时间（东8时区）
Date.now = function () {
    var nowTime = new Date().getTime();
    var diff = new Date(nowTime).getTimezoneOffset() * 60000;
    nowTime += diff;
    nowTime += 8 * 60 * 60 * 1000;
    return nowTime;
};

$(function () {

    //获取所有股票
    $_.getAllStock();

    // if ($_.CheckSystem.isIE()) {
    //     $('body').html('<br /><br /><center><div><span>抱歉，当前网站不支持IE浏览器，请使用非IE浏览器访问！</span></h2></center>').show();
    // }
    // else if (($_.CheckSystem.isAndroid() || $_.CheckSystem.isIos()) && !window.moibleRead_) {
    //     $('head').append('<meta content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" name="viewport">');

    //     if ($_.CheckSystem.isIos()) dlhref = 'https://itunes.apple.com/us/app/kai-pan-la/id1071188962?l=zh&ls=1&mt=8';
    //     else dlhref = 'https://res.kaipanla.com/tj/index.php?c=GetVersion&a=redirect&v=1';

    //     dlhref = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.aiyu.kaipanla';

    //     //$('body').html('<br /><br /><center><div style="padding:30px;"><span>抱歉，当前网站不支持移动设备访问，请前往&nbsp;<a class="red" href="' + dlhref+'">下载开盘啦APP</a>&nbsp;进行浏览！</span></h2></center>').show();

    //     $('body').html('<img style="width:100%;" src="' + $_.imgUrl + 'other/invtBg.jpg" />').css({ 'background-color': '#ff2447' }).attr('onclick', "window.open('" + dlhref + "')");
    // }
});


// //百度统计
// var _hmt = _hmt || [];
// (function () {
//     var hm = document.createElement("script");
//     hm.src = "https://hm.baidu.com/hm.js?13995e0e78c2dc80389e4d4526856615";
//     var s = document.getElementsByTagName("script")[0];
//     s.parentNode.insertBefore(hm, s);
// })();



window.log = console.log;

window.onfocus = function () {
    //$_.isFocus = true;
    //if (typeof $_.onfocus === 'function') $_.onfocus(true);
};
window.onblur = function () {
    //$_.isFocus = false;
    //if (typeof $_.onfocus === 'function') $_.onfocus(false);
};
