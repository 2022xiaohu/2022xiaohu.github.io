// 获取股票历史涨幅
function hisStockRanking(date, callback) {
    var m_data = []
    $.ajax({
        url: 'https://apphis.longhuvip.com/w1/api/index.php',
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
    function get_broke() {
        var m_data = []
        $.ajax({
            url: 'https://apphq.longhuvip.com/w1/api/index.php',
            type: 'POST',
            data: {
                'Order': '1',
                'a': 'DaBanList',
                'st': '100',
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
                set_table_broke(data);
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
            url: 'https://apphis.longhuvip.com/w1/api/index.php',
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
    function get_daily_limit_performance1(id, caption) {
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
                set_table1(data, id, caption);
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
            url: 'https://apphis.longhuvip.com/w1/api/index.php',
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
            url: 'https://apphis.longhuvip.com/w1/api/index.php',
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
            url: 'https://apphis.longhuvip.com/w1/api/index.php',
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
            url: 'https://apphis.longhuvip.com/w1/api/index.php',
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
            url: 'https://apphis.longhuvip.com/w1/api/index.php',
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
            url: 'https://apphis.longhuvip.com/w1/api/index.php',
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
            url: 'https://apphis.longhuvip.com/w1/api/index.php',
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
    function get_daily_limit_performance2(id, caption) {
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
                set_table1(data, id, caption);
            },
            error: function (msg) {
                console.log(msg);
            }
        })

    };

    // 未涨停的昨日一板个股
    function get_daily_notlimit_performance1(id, caption) {
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
                set_table2(data, id, caption);
            },
            error: function (msg) {
                console.log(msg);
            }
        })

    };

    // 三板涨停
    function threePlate(id, caption) {
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
                set_table1(data, id, caption);
            },
            error: function (msg) {
                console.log(msg);
            }
        })

    };

    // 未涨停的昨日二板个股
    function twoBoardStocksYesterday(id, caption) {
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
                set_table2(data, id, caption);
            },
            error: function (msg) {
                console.log(msg);
            }
        })

    };

    // 四板
    function fourPlate(id, caption) {
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
                set_table1(data, id, caption);
            },
            error: function (msg) {
                console.log(msg);
            }
        })

    };

    // 未涨停的昨日三板个股
    function threeBoardStocksYesterday(id, caption) {
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
                set_table2(data, id, caption);
            },
            error: function (msg) {
                console.log(msg);
            }
        })

    };

    // 5板或更高
    function fivePlate(id, caption) {
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
                set_table1(data, id, caption);
            },
            error: function (msg) {
                console.log(msg);
            }
        })

    };

    // 未涨停的昨日四板个股
    function fourBoardStocksYesterday(id, caption) {
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
                set_table2(data, id, caption);
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
            url: 'https://apphis.longhuvip.com/w1/api/index.php',
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
            url: 'https://apphis.longhuvip.com/w1/api/index.php',
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
            url: 'https://apphis.longhuvip.com/w1/api/index.php',
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
            url: 'https://apphis.longhuvip.com/w1/api/index.php',
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
                url: 'https://apphis.longhuvip.com/w1/api/index.php',
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
        var m_data = []
        $.ajax({
            url: 'https://apphis.longhuvip.com/w1/api/index.php',
            type: 'POST',
            data: {
                'Order': '1',
                'a': 'HisDaBanList',
                'st': '100',
                'apiv': 'w29',
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
                'index': '0'
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