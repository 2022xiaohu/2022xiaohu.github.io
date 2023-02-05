    // 获取涨停板数据
    function get_now_limit() {
        var m_data = []
        $.ajax({
            url: '/get_now_limit',
            data: {},
            type: 'POST',
            async: false,
            dataType: 'json',
            success: function(data) {
                m_data = data
            },
            error: function(msg) {
                console.log(msg)
            }
        })
        return m_data;
    };

    // 获取涨停板股票名称池
    function get_now_limit_names() {
        data_limit = get_now_limit()['date']['list']
        var names =[]
        for(var i=0;i<data_limit.length;i++){
            names.push(data_limit[i][1])
        }
        return names
    }