url='http://192.168.2.250:5000/kaipanla'

// 东方财富股票实时数据
function bkStocksrise(_data, id, caption, callback) {
    stocks = _data['Stocks']
    if (!stocks || stocks == false) {
        return null;
    }
    var m_data = []

    let stock = '';
    // console.log('stocks='+stocks);
    //获取股票代码

    for (let i = 0; i < stocks.length; i++) {
        // if(stocks[i]=='000721'){
        //    console.log(stocks[i]);
        //    status = 1;
        // }
        if (stocks[i].slice(0, 1) == 6) {
            // stocks[i]='1.'+stocks[i]+'%2C';
            stock = stock + '1.' + stocks[i] + '%2C';
        } else {
            // stocks[i]='0.'+stocks[i]+'%2C';
            stock = stock + '0.' + stocks[i] + '%2C';
        }
    }

    $.ajax({
        url: 'https://push2.eastmoney.com/api/qt/ulist/get?fltt=1&invt=2&cb=jQuery351010838368397660503_1675494557241&fields=f3%2Cf12&secids=' + stock + '&ut=fa5fd1943c7b386f172d6893dbfba10b&pn=1&np=1&pz=30&wbp2u=%7C0%7C0%7C0%7Cweb&_=1675494557502',
        type: 'POST',
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var regex3 = /\{.*\}/;  // {} 花括号，大括号
            // res.send(JSON.stringify(body.match(regex3)));// JSON格式化
            data = data.match(regex3)[0];
            // console.log(data);
            var data = eval('(' + data + ')')['data']['diff'];//json格式化数据
            //处理数据
            let json = {};
            for (let i = 0; i < _data['list'].length; i++) {
                // let float = (data[i]['f3'] / 100).toFixed(2);
                // json[data[i]['f12']] = float;
                _data['list'][i][9]=data[i]['f3']/100//涨速替换为实时涨幅
            }
            callback(_data, id, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 板块 精选
function bkjxStockRanking(date, callback, callback2, table2) {
    var list_table = ["table-list-1","table-list-2","table-list-3","table-list-4","table-list-5","table-list-6"]
    $.ajax({
        url: 'https://apphq.longhuvip.com/w1/api/index.php',
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'RealRankingInfo',
            'st': '30',
            'c': 'ZhiShuRanking',
            'PhoneOSNew': '1',
            'old': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'VerSion': '5.13.0.0',
            'Index': '0',
            'apiv': 'w35',
            'Type': '1',
            'ZSType': '7',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')');//json格式化数据
            console.log(data);
            callback(data)
            for(i=0; i<6; i++){
                callback2(date, table2, data['list'][i][0], list_table[i], data['list'][i][1])
            }
            
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 历史 板块 精选
function bkjxStockRankingHistory(date, callback, callback2, table2) {
    var list_table = ["table-list-1","table-list-2","table-list-3","table-list-4","table-list-5","table-list-6"]
    $.ajax({
        url: 'http://192.168.2.250:5000/kaipanla',
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'RealRankingInfo',
            'st': '30',
            'c': 'ZhiShuRanking',
            'PhoneOSNew': '1',
            // 'old': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'VerSion': '5.13.0.0',
            'Index': '0',
            'Date': date,
            'apiv': 'w35',
            'Type': '1',
            'ZSType': '7',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')');//json格式化数据
            console.log(data);
            callback(data)
            for(i=0; i<6; i++){
                callback2(date, table2, data['list'][i][0], list_table[i], data['list'][i][1])
            }
            
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 板块内股票
function bkStockRanking(date, callback, PlateID, table, caption) {
    var m_data = []
    $.ajax({
        url: 'https://apphq.longhuvip.com/w1/api/index.php',
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'ZhiShuStockList_W8',
            'st': '30',
            'c': 'ZhiShuRanking',
            'PhoneOSNew': '1',
            'old': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'VerSion': '5.13.0.0',
            'IsZZ': '0',
            'Index': '0',
            // 'Date': date,
            'apiv': 'w35',
            'Type': '6',
            'IsKZZType': '0',
            'UserID': '0',
            'PlateID': PlateID,
            // 'FilterMotherboard': '0',
            // 'Filter': '0',
            // 'Ratio': '6',
            // 'FilterTIB': '0',
            // 'FilterGem': '0',
            // 'PidType': '5',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')');//json格式化数据
            console.log(data);
            // callback(data, table, caption)
            bkStocksrise(data, table, caption, callback)//更新股票实时涨幅
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 历史板块内股票
function bkStockRankingHistory(date, callback, PlateID, table, caption) {
    var m_data = []
    $.ajax({
        url: 'http://192.168.2.250:5000/kaipanla',
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'ZhiShuStockList_W8',
            'st': '30',
            'c': 'ZhiShuRanking',
            'PhoneOSNew': '1',
            'old': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'VerSion': '5.13.0.0',
            'IsZZ': '0',
            'Index': '0',
            'Date': date,
            'apiv': 'w35',
            'Type': '6',
            'IsKZZType': '0',
            'UserID': '0',
            'PlateID': PlateID,
            // 'FilterMotherboard': '0',
            // 'Filter': '0',
            // 'Ratio': '6',
            // 'FilterTIB': '0',
            // 'FilterGem': '0',
            // 'PidType': '5',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')');//json格式化数据
            console.log(data);
            // callback(data, table, caption)
            bkStocksrise(data, table, caption, callback)//更新股票实时涨幅
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 获取股票历史涨幅
function hisStockRanking(date, callback) {
    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'HisRankingInfo_W8',
            'st': '60',
            'c': 'HisStockRanking',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'Isst': '0',
            'index': '0',
            'Date': date,
            'apiv': 'w31',
            'Type': '8',
            'FilterMotherboard': '0',
            'Filter': '0',
            'Ratio': '6',
            'FilterTIB': '0',
            'FilterGem': '0',
            // 'PidType': '5',
            // 'VerSion': '5.7.0.14',


        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')');//json格式化数据
            console.log(data);
            callback(data)
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 获取股票历史涨幅
function newStockRanking(date, callback) {
    var m_data = []
    $.ajax({
        url: 'https://apphq.longhuvip.com/w1/api/index.php',
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'RealRankingInfo_W8',
            'st': '60',
            'apiv': 'w31',
            'Type': '8',
            'c': 'NewStockRanking',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0',
            'Date': date,
            'PidType': '5',
            'VerSion': '5.7.0.14',
            'Isst': '0',
            'FilterMotherboard': '0',
            'Filter': '0',
            'Ratio': '6',
            'FilterTIB': '0',
            'FilterGem': '0',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')');//json格式化数据
            console.log(data);
            callback(data)
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};


// 炸板
function get_broke(tableId) {
    var m_data = []
    $.ajax({
        url: 'https://apphq.longhuvip.com/w1/api/index.php',
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'DaBanList',
            'st': '60',
            'apiv': 'w28',
            'c': 'HomeDingPan',
            'PidType': '2',
            'Is_st': '1',
            'PhoneOSNew': '1',
            'Type': '4',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0'
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['list'];//json格式化数据
            // console.log(data);
            set_table_broke(data, tableId);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 获取历史未涨停的四板及以上个股
function fourBoardStocksYesterdayHistory(date) {
    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'DailyLimitPerformance2',
            'st': '100',
            'apiv': 'w29',
            'Type': '5',
            'c': 'HisHomeDingPan',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0',
            'Day': date,
            'PidType': '5',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            fourBoardStocksYesterdayHistoryCallback(data);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 一板涨停
function get_daily_limit_performance1(caption, tbodyId, tableId, callback) {
    var m_data = []
    $.ajax({
        url: 'https://apphq.longhuvip.com/w1/api/index.php',
        type: 'POST',
        data: {
            'Order': '0',
            'a': 'DailyLimitPerformance',
            'st': '100',
            'apiv': 'w29',
            'c': 'HomeDingPan',
            'PidType': '1',
            'PhoneOSNew': '1',
            'Type': '4',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0'
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            callback(data, tbodyId, tableId, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 一板涨停排序
function get_daily_limit_performance_sort(id, caption) {
    var m_data = []
    $.ajax({
        url: 'https://apphq.longhuvip.com/w1/api/index.php',
        type: 'POST',
        data: {
            'Order': '0',
            'a': 'DailyLimitPerformance',
            'st': '100',
            'apiv': 'w29',
            'c': 'HomeDingPan',
            'PidType': '1',
            'PhoneOSNew': '1',
            'Type': '5',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0'
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            set_table1(data, id, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 历史一板
function oneStocksHistory(date, id, caption) {
    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': '0',
            'a': 'DailyLimitPerformance',
            'st': '100',
            'apiv': 'w29',
            'Type': '4',
            'c': 'HisHomeDingPan',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0',
            'Day': date,
            'PidType': '1',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            set_table1(data, id, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};


// 历史二板
function oneStocksYesterdayHistory(date, id, caption) {
    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': '0',
            'a': 'DailyLimitPerformance',
            'st': '100',
            'apiv': 'w29',
            'Type': '4',
            'c': 'HisHomeDingPan',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0',
            'Day': date,
            'PidType': '2',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            set_table1(data, id, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 未涨停的昨日一板个股
function oneBoardStocksYesterday(date, id, caption) {
    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'DailyLimitPerformance2',
            'st': '100',
            'apiv': 'w29',
            'Type': '5',
            'c': 'HisHomeDingPan',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0',
            'Day': date,
            'PidType': '2',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            set_table2(data, id, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 历史三板
function twoStocksYesterdayHistory(date, id, caption) {
    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': '0',
            'a': 'DailyLimitPerformance',
            'st': '100',
            'apiv': 'w29',
            'Type': '4',
            'c': 'HisHomeDingPan',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0',
            'Day': date,
            'PidType': '3',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            set_table1(data, id, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};


// 历史四板
function threeStocksYesterdayHistory(date, id, caption) {
    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': '0',
            'a': 'DailyLimitPerformance',
            'st': '100',
            'apiv': 'w29',
            'Type': '4',
            'c': 'HisHomeDingPan',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0',
            'Day': date,
            'PidType': '4',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            set_table1(data, id, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 历史四板及以上个股
function fourStocksYesterdayHistory(date, id, caption) {
    if (!date || date == false) {
        return null;
    }
    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': '0',
            'a': 'DailyLimitPerformance',
            'st': '100',
            'apiv': 'w29',
            'Type': '4',
            'c': 'HisHomeDingPan',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0',
            'Day': date,
            'PidType': '5',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            set_table1(data, id, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 历史未涨停的昨日四板及以上个股
function fourBoardStocksYesterdayHistorySetTable(date, id, caption) {
    if (!date || date == false) {
        return null;
    }
    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'DailyLimitPerformance2',
            'st': '100',
            'apiv': 'w29',
            'Type': '5',
            'c': 'HisHomeDingPan',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0',
            'Day': date,
            'PidType': '5',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            set_table2(data, id, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 二板涨停
function get_daily_limit_performance2(caption, tbodyId, tableId, callback) {
    var m_data = []
    $.ajax({
        url: 'https://apphq.longhuvip.com/w1/api/index.php',
        type: 'POST',
        data: {
            'Order': '0',
            'a': 'DailyLimitPerformance',
            'st': '100',
            'apiv': 'w29',
            'c': 'HomeDingPan',
            'PidType': '2',
            'PhoneOSNew': '1',
            'Type': '4',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0'
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            callback(data, tbodyId, tableId, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 未涨停的昨日一板个股
function get_daily_notlimit_performance1(caption, tbodyId, tableId, callback) {
    var m_data = []
    $.ajax({
        url: 'https://apphq.longhuvip.com/w1/api/index.php',
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'DailyLimitPerformance2',
            'st': '100',
            'apiv': 'w28',
            'c': 'HomeDingPan',
            'PidType': '2',
            'PhoneOSNew': '1',
            'Type': '5',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0'
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            callback(data, tbodyId, tableId, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 三板涨停
function threePlate(caption, tbodyId, tableId, callback) {
    var m_data = []
    $.ajax({
        url: 'https://apphq.longhuvip.com/w1/api/index.php',
        type: 'POST',
        data: {
            'Order': '0',
            'a': 'DailyLimitPerformance',
            'st': '100',
            'apiv': 'w29',
            'c': 'HomeDingPan',
            'PidType': '3',
            'PhoneOSNew': '1',
            'Type': '4',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0'
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            callback(data, tbodyId, tableId, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 未涨停的昨日二板个股
function twoBoardStocksYesterday(caption, tbodyId, tableId, callback) {
    var m_data = []
    $.ajax({
        url: 'https://apphq.longhuvip.com/w1/api/index.php',
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'DailyLimitPerformance2',
            'st': '100',
            'apiv': 'w29',
            'c': 'HomeDingPan',
            'PidType': '3',
            'PhoneOSNew': '1',
            'Type': '5',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0'
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            callback(data, tbodyId, tableId, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 四板
function fourPlate(caption, tbodyId, tableId, callback) {
    var m_data = []
    $.ajax({
        url: 'https://apphq.longhuvip.com/w1/api/index.php',
        type: 'POST',
        data: {
            'Order': '0',
            'a': 'DailyLimitPerformance',
            'st': '100',
            'apiv': 'w29',
            'c': 'HomeDingPan',
            'PidType': '4',
            'PhoneOSNew': '1',
            'Type': '4',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0'
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            callback(data, tbodyId, tableId, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 未涨停的昨日三板个股
function threeBoardStocksYesterday(caption, tbodyId, tableId, callback) {
    var m_data = []
    $.ajax({
        url: 'https://apphq.longhuvip.com/w1/api/index.php',
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'DailyLimitPerformance2',
            'st': '100',
            'apiv': 'w29',
            'c': 'HomeDingPan',
            'PidType': '4',
            'PhoneOSNew': '1',
            'Type': '5',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0'
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            callback(data, tbodyId, tableId, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 5板或更高
function fivePlate(caption, tbodyId, tableId, callback) {
    var m_data = []
    $.ajax({
        url: 'https://apphq.longhuvip.com/w1/api/index.php',
        type: 'POST',
        data: {
            'Order': '0',
            'a': 'DailyLimitPerformance',
            'st': '100',
            'apiv': 'w29',
            'c': 'HomeDingPan',
            'PidType': '5',
            'PhoneOSNew': '1',
            'Type': '4',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0'
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            callback(data, tbodyId, tableId, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 未涨停的昨日四板个股
function fourBoardStocksYesterday(caption, tbodyId, tableId, callback) {
    var m_data = []
    $.ajax({
        url: 'https://apphq.longhuvip.com/w1/api/index.php',
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'DailyLimitPerformance2',
            'st': '100',
            'apiv': 'w29',
            'c': 'HomeDingPan',
            'PidType': '5',
            'PhoneOSNew': '1',
            'Type': '5',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0'
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            callback(data, tbodyId, tableId, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 历史未涨停的四板个股
function fourBoardStocksYesterdayHistory1(date, id, caption, callback) {
    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'DailyLimitPerformance2',
            'st': '100',
            'apiv': 'w29',
            'Type': '5',
            'c': 'HisHomeDingPan',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0',
            'Day': date,
            'PidType': '5',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            if (!callback || callback == false) {
                set_table2(data, id, caption);
            } else {
                callback(data);
            }
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 历史未涨停的三板个股
function threeBoardStocksYesterdayHistory(date, id, caption, callback) {
    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'DailyLimitPerformance2',
            'st': '100',
            'apiv': 'w29',
            'Type': '5',
            'c': 'HisHomeDingPan',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0',
            'Day': date,
            'PidType': '4',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            if (!callback || callback == false) {
                set_table2(data, id, caption);
            } else {
                callback(data);
            }
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 历史未涨停的二板个股
function twoBoardStocksYesterdayHistory(date, id, caption, callback) {
    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'DailyLimitPerformance2',
            'st': '100',
            'apiv': 'w29',
            'Type': '5',
            'c': 'HisHomeDingPan',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0',
            'Day': date,
            'PidType': '3',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            if (!callback || callback == false) {
                set_table2(data, id, caption);
            } else {
                callback(data);
            }
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 历史未涨停的昨日一板个股
function oneBoardStocksYesterdayHistory(date, id, caption, callback) {
    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'DailyLimitPerformance2',
            'st': '100',
            'apiv': 'w29',
            'Type': '5',
            'c': 'HisHomeDingPan',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0',
            'Day': date,
            'PidType': '2',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            if (!callback || callback == false) {
                set_table2(data, id, caption);
            } else {
                callback(data);
            }
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 历史未涨停的昨日一板个股
function zeroBoardStocksYesterdayHistory(date, id, caption, callback) {
    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'DailyLimitPerformance2',
            'st': '100',
            'apiv': 'w29',
            'Type': '5',
            'c': 'HisHomeDingPan',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0',
            'Day': date,
            'PidType': '1',
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['info'][0];//json格式化数据
            // console.log(data);
            if (!callback || callback == false) {
                set_table2(data, id, caption);
            } else {
                callback(data);
            }
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};



// 昨日炸板个股
function limit_broke_history(date, id, caption, callback) {
    // //JS修改浏览器UserAgent方法

    // var customUserAgent = 'Mozilla/5.0 (Linux; U; Android 7.0; zh-CN; PRO 7-S Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/11.9.4.974 UWS/2.13.2.46 Mobile Safari/537.36 AliApp(DingTalk/4.6.29) com.alibaba.android.rimet/11388461 Channel/10002068 language/zh-CN';

    // //修改后的userAgent            
    // Object.defineProperty(navigator, 'userAgent', {
    //     value: customUserAgent,
    //     writable: false
    // });

    // //打印
    // console.log(navigator.userAgent);

    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': '1',
            'a': 'HisDaBanList',
            'st': '70',
            'apiv': 'w35',
            'c': 'HisHomeDingPan',
            'PidType': '2',
            'Is_st': '1',
            'Day': date,
            'PhoneOSNew': '1',
            'Type': '4',
            'FilterMotherboard': '0',
            'Filter': '0',
            'FilterTIB': '0',
            'FilterGem': '0',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'index': '0',
            'VerSion': '5.13.0.0'
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['list'];//json格式化数据
            // console.log(data);
            callback(data, id, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 历史涨停的股票池
function get_history_limit(date, id, caption, callback) {
    var m_data = []
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            'Order': "0",
            'st': '70',
            'a': 'HisDaBanList',
            'c': 'HisHomeDingPan',
            'PhoneOSNew': '1',
            'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
            'Index': '0',//下一组开始的索引
            'Is_st': '1',
            'PidType': '1',
            'apiv': 'w27',
            'Type': '6',
            'Day': date  // 2021-10-25
        },
        async: true,
        dataType: 'text',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            var data = eval('(' + data + ')')['list'];//json格式化数据
            // console.log(data);
            var stocks_code = new Array()
            for (i = 0; i < data.length; i++) {
                stocks_code.push(data[i][0])
            }
            callback(stocks_code, data, id, caption, set_table_history_limit);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};