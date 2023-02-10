// 获取股票历史涨幅
function stocksHistory(date, callback) {
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