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