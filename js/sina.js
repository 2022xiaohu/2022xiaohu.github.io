// 获取股票的分钟数据
function get_min_line_data(fun,code) {
    var m_data = []
    $.ajax({
        url: '/get_min_line_data',
        data:{data:code},
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