// 东方财富股票实时数据
function bkStocksrise(stocks, id, caption, callback) {
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
        url: 'https://push2.eastmoney.com/api/qt/ulist/get?fltt=1&invt=2&cb=jQuery351010838368397660503_1675494557241&fields=f3%2Cf12&secids=' + stock + '&ut=fa5fd1943c7b386f172d6893dbfba10b&pn=1&np=1&pz=20&wbp2u=%7C0%7C0%7C0%7Cweb&_=1675494557502',
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
            for (let i = 0; i < data.length; i++) {
                let float = (data[i]['f3'] / 100).toFixed(2);
                json[data[i]['f12']] = float;
            }
            callback(json, id, caption);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 东方财富股票实时数据
function codes_rise(stocks, _data, id, caption, callback) {
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
        url: 'https://push2.eastmoney.com/api/qt/ulist/get?fltt=1&invt=2&cb=jQuery351010838368397660503_1675494557241&fields=f3%2Cf12&secids=' + stock + '&ut=fa5fd1943c7b386f172d6893dbfba10b&pn=1&np=1&pz=20&wbp2u=%7C0%7C0%7C0%7Cweb&_=1675494557502',
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
            for (let i = 0; i < data.length; i++) {
                let float = (data[i]['f3'] / 100).toFixed(2);
                json[data[i]['f12']] = float;
            }
            callback(_data, id, caption, json);
        },
        error: function (msg) {
            console.log(msg);
        }
    })

};

// 获取股票的分钟数据
function get_min_line_data(fun,code) {
    var m_data = []
    $.ajax({
        url: '/get_min_line_data_eastmoney',
        data:{data:code},
        type: 'POST',
        async: true,
        dataType: 'json',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            fun(data);
            console.log(data);
            // update_table(data)
        },
        error: function (msg) {
            console.log(msg);
        }
    })
};

// 获取多个股票的分钟数据
function get_multiple_min_line_data(fun,codes,days) {
    var m_data = []
    $.ajax({
        url: '/get_multiple_min_line_data_eastmoney',
        data:{data:codes,days:days},
        type: 'POST',
        async: true,
        dataType: 'json',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            fun(data);
            console.log(data);
            // update_table(data)
        },
        error: function (msg) {
            console.log(msg);
        }
    })
};

// 获取所有股票的实时数据
function get_all_stock(fun) {
    var m_data = []
    $.ajax({
        url: '/get_all_stock_eastmoney',
        type: 'POST',
        async: true,
        dataType: 'json',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            fun(data['data']);
            console.log(data);
            // update_table(data)
        },
        error: function (msg) {
            console.log(msg);
        }
    })
};

// 昨日涨停股票池
function get_yesterday_zt_pool(fun,date) {
    var m_data = []
    $.ajax({
        url: '/get_yesterday_zt_pool',
        data:{data:date},
        type: 'POST',
        async: true,
        dataType: 'json',
        // contentType: 'application/json; charset=UTF-8',
        success: function (data) {
            fun(data['data']);
            console.log(data);
            // update_table(data)
        },
        error: function (msg) {
            console.log(msg);
        }
    })
};

//最近几个交易日日期
function history_date(req, res){
    let request = require('request');
 
    const options = {
       url: 'http://push2his.eastmoney.com/api/qt/stock/kline/get?cb=jQuery351020143393668275844_1674273725401&secid=0.000001&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1&fields2=f51&klt=101&fqt=1&end=20500101&lmt=1000000&_=1674273725455 ',
       headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
       },
    };
    
    function callback(error, response, body) {
       if (!error && response.statusCode == 200) {
        //   console.log(body);
          return body;
       }
    }
 
    request(options, callback);
 }

 module.exports = {history_date}// 到处模块函数