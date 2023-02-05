    // 获取昨日涨停现在涨幅数据
    function get_limit1_data(fun, limit, id, caption) {
        var m_data = []
        $.ajax({
            url: '/' + fun,
            data: {
                'data': limit
            },
            type: 'POST',
            async: true, //异步加载
            dataType: 'json',
            success: function (data) {
                m_data = data
                set_table1(data, id, caption)
                // set_option()
            },
            error: function (msg) {
                console.log(msg);
            }
        })
        return m_data;
    };

    // 获取昨日涨停今日未涨停数据
    function get_limit2_data(fun, limit, id, caption) {
        var m_data = []
        $.ajax({
            url: '/' + fun,
            data: {
                'data': limit
            },
            type: 'POST',
            async: true, //异步加载
            dataType: 'json',
            success: function (data) {
                m_data = data
                set_table2(data, id, caption)
                // set_option()
            },
            error: function (msg) {
                console.log(msg);
            }
        })
        return m_data;
    };

    function get_data() {
        get_limit1_data('get_daily_limit_performance', '1', 'limit1', '一板')
        get_limit1_data('get_daily_limit_performance', '2', 'limit2', '二板')
        get_limit2_data('get_daily_limit_performance2', '2', 'limit22', '未涨停的昨日一板个股')
        get_limit1_data('threePlate', '2', 'limit3', '三板')
        get_limit2_data('twoBoardStocksYesterday', '2', 'limit33', '未涨停的昨日二板个股')
        get_limit1_data('fourPlate', '2', 'limit4', '四板')
        get_limit2_data('threeBoardStocksYesterday', '2', 'limit44', '未涨停的昨日三板个股')
        get_limit1_data('fivePlate', '2', 'limit5', '更高')
        get_limit2_data('fourBoardStocksYesterday', '2', 'limit55', '未涨停的昨日四板个股')
    }