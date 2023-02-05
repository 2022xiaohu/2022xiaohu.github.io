var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static('.'));// 对外开放文件
var bodyParser = require('body-parser');
app.use(bodyParser());

app.get('/', function (req, res) {
   // console.log("主页 GET 请求");
   const request = require('request');

   const options = {
      url: 'https://apphq.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
         Order: '1',
         a: 'DaBanList',
         st: '100',
         apiv: 'w28',
         c: 'HomeDingPan',
         PidType: '2',
         Is_st: '1',
         PhoneOSNew: '1',
         Type: '4',
         DeviceID: 'ffffffff-fade-f24e-f9d3-785f00000000',
         index: '0'
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         // console.log(body);
         res.send(body);
         // const info = JSON.parse(body);
         // console.log(info.stargazers_count + " Stars");
         // console.log(info.forks_count + " Forks");
      }
   }

   request(options, callback);
})


//  POST 请求
app.post('/', function (req, res) {
   var myRequest = require('request')
   var myCheerio = require('cheerio')
   var myURL = 'https://www.ecnu.edu.cn/e5/bc/c1950a255420/page.htm'
   function request(url, callback) {//request module fetching url
      var options = {
         url: url, encoding: null, headers: null
      }
      myRequest(options, callback)
   }
   request(myURL, function (err, res, body) {
      var html = body;
      var $ = myCheerio.load(html, { decodeEntities: false });
      console.log($.html());
   })

   console.log("主页 POST 请求");
   res.send('Hello POST');
})

//  /del_user 页面响应
app.get('/limitUp', function (req, res) {
   // console.log("/limitUp 响应 DELETE 请求");
   var fileName = "./limitUp.html";
   fs.readFile(fileName, 'utf8', function (err, data) {
      if (err)
         console.log("对不起，您所访问的路径出错");
      else {
         res.setHeader('Content-Type', 'text/html;charset=utf-8');// 防止中文乱码
         res.write(data);
      }
   })
   // res.send(limitUp.html);
})

app.get('/index.html', function (req, res) {
   console.log("/index.html 请求");
   var fileName = "./index.html";
   fs.readFile(fileName, 'utf8', function (err, data) {
      if (err)
         console.log("对不起，您所访问的路径出错");
      else {
         res.setHeader('Content-Type', 'text/html;charset=utf-8');// 防止中文乱码
         res.write(data);
      }
   })
})

//最近所有交易日日期
app.get('/history_date', function (req, res) {
   // console.log("history_date 请求");

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
         var regex3 = /\{\"[code].*\]\}/;  // {} 花括号，大括号
         res.send(JSON.stringify(body.match(regex3)));// JSON格式化
      }
   }

   request(options, callback);
})

//最近所有交易日日期
app.get('/get_history_date', function (req, res) {
   // console.log("get_history_date 请求");

   let request = require('request');

   const options = {
      url: 'http://push2his.eastmoney.com/api/qt/stock/kline/get?cb=jQuery351020143393668275844_1674273725401&secid=0.000001&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1&fields2=f51&klt=101&fqt=1&end=20500101&lmt=1000000&_=1674273725455 ',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         // console.log(body);
         // var myRe = new RegExp("\{(\S*\s*)*\}*",'g');
         // var myArray = myRe.match(body);

         var regex3 = /\{\"[code].*\]\}/;  // {} 花括号，大括号
         data = body.match(regex3)[0];
         res.send(data);
      }
   }

   request(options, callback);
})

//获取现在涨停的股票池
app.get('/get_now_limit', function (req, res) {
   // console.log("get_now_limit 请求");

   let request = require('request');

   const options = {
      url: 'https://apphq.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
         'Order': "1",
         'a': 'DaBanList',
         'st': '200',
         'c': 'HomeDingPan',
         'PhoneOSNew': '1',
         'DeviceID': '0a221636-8a72-3108-ae94-27915e569255',
         'Index': '0',
         'Is_st': '1',
         'PidType': '1',
         'apiv': 'w29',
         'Type': '6',
         'FilterMotherboard': '0',
         'Filter': '0',
         'FilterTIB': '0',
         'FilterGem': '0'
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         //   console.log(body);
         res.send(body);
      }
   }

   request(options, callback);
})

//五连板
app.post('/fivePlate', function (req, res) {
   // console.log("fivePlate 请求");

   let request = require('request');

   const options = {
      url: 'https://apphq.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
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
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         // console.log(data);
         res.send(data);
      }
   }

   request(options, callback);
})

//四连板
app.post('/fourPlate', function (req, res) {
   // console.log("fourPlate 请求");

   let request = require('request');

   const options = {
      url: 'https://apphq.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
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
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         // console.log(data);
         res.send(data);
      }
   }

   request(options, callback);
})

//三连板
app.post('/threePlate', function (req, res) {
   // console.log("threePlate 请求");

   let request = require('request');

   const options = {
      url: 'https://apphq.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
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
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         // console.log(data);
         res.send(data);
      }
   }

   request(options, callback);
})

// 获取昨日涨停今日未涨停表现
app.post('/get_daily_limit_performance2', function (req, res) {
   // console.log("get_daily_limit_performance2 请求");

   let request = require('request');

   const options = {
      url: 'https://apphq.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
         'Order': '1',
         'a': 'DailyLimitPerformance2',
         'st': '100',
         'apiv': 'w28',
         'c': 'HomeDingPan',
         'PidType': req.body.data,
         'PhoneOSNew': '1',
         'Type': '5',
         'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
         'index': '0'
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         //   console.log(body);
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         // console.log(data);
         res.send(data);
      }
   }

   request(options, callback);
})

// 获取涨停表现
app.post('/get_daily_limit_performance', function (req, res) {
   // console.log("get_daily_limit_performance 请求");

   let request = require('request');

   const options = {
      url: 'https://apphq.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
         'Order': '0',
         'a': 'DailyLimitPerformance',
         'st': '100',
         'apiv': 'w29',
         'c': 'HomeDingPan',
         'PidType': req.body.data,
         'PhoneOSNew': '1',
         'Type': '4',
         'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
         'index': '0'
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         //   console.log(body);
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         // console.log(data);
         res.send(data);
      }
   }

   request(options, callback);
})

//未涨停的昨日三板个股
app.post('/threeBoardStocksYesterday', function (req, res) {
   // console.log("threeBoardStocksYesterday 请求");

   let request = require('request');

   const options = {
      url: 'https://apphq.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
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
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         // console.log(data);
         res.send(data);
      }
   }

   request(options, callback);
})

//未涨停的昨日二板个股
app.post('/twoBoardStocksYesterday', function (req, res) {
   // console.log("twoBoardStocksYesterday 请求");

   let request = require('request');

   const options = {
      url: 'https://apphq.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
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
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         // console.log(data);
         res.send(data);
      }
   }

   request(options, callback);
})

//炸板股
app.get('/limit_broke', function (req, res) {
   // console.log("limit_broke 请求");

   let request = require('request');

   const options = {
      url: 'https://apphq.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
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
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         //   console.log(body);
         res.send(body);
      }
   }

   request(options, callback);
})

//历史未涨停的昨日2板个股
app.post('/twoBoardStocksYesterdayHistory', function (req, res) {
   if(!req.body.data){
      return null;
   }

   let request = require('request');

   const options = {
      url: 'https://apphis.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
         'Order': '1',
         'a': 'DailyLimitPerformance2',
         'st': '100',
         'apiv': 'w29',
         'Type': '5',
         'c': 'HisHomeDingPan',
         'PhoneOSNew': '1',
         'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
         'index': '0',
         'Day': req.body.data,
         'PidType': '3',
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         // console.log(data);
         res.send(data);
      }
   }

   request(options, callback);
})

//历史未涨停的昨日3板个股
app.post('/threeBoardStocksYesterdayHistory', function (req, res) {
   if(!req.body.data){
      return null;
   }

   let request = require('request');
   const options = {
      url: 'https://apphis.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
         'Order': '1',
         'a': 'DailyLimitPerformance2',
         'st': '100',
         'apiv': 'w29',
         'Type': '5',
         'c': 'HisHomeDingPan',
         'PhoneOSNew': '1',
         'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
         'index': '0',
         'Day': req.body.data,
         'PidType': '4',
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         // console.log(data);
         res.send(data);
      }
   }

   request(options, callback);
})

//历史炸板股
app.post('/limit_broke_history', function (req, res) {
   // console.log("limit_broke_history 请求");

   let request = require('request');
   // console.log(req.body.data);
   const options = {
      url: 'https://apphis.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
         'Order': '1',
         'a': 'HisDaBanList',
         'st': '100',
         'apiv': 'w29',
         'c': 'HisHomeDingPan',
         'PidType': '2',
         'Is_st': '1',
         'Day': req.body.data,
         'PhoneOSNew': '1',
         'Type': '4',
         'FilterMotherboard': '0',
         'Filter': '0',
         'FilterTIB': '0',
         'FilterGem': '0',
         'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
         'index': '0'
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = eval('(' + body + ')')['list'];//json格式化数据
         // console.log(data);
         res.send(data);
      }
   }

   request(options, callback);
})

//未涨停的昨日四板及以上个股
app.post('/fourBoardStocksYesterday', function (req, res) {
   // console.log("fourBoardStocksYesterday 请求");

   let request = require('request');

   const options = {
      url: 'https://apphq.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
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
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         // console.log(data);
         res.send(data);
      }
   }

   request(options, callback);
})

//历史未涨停的昨日四板及以上个股
app.post('/fourBoardStocksYesterdayHistory', function (req, res) {
   if(!req.body.data || req.body.data == false){
      return null;
   }

   let request = require('request');
   // console.log('req.body.data=' + req.body.data);

   const options = {
      url: 'https://apphis.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
         'Order': '1',
         'a': 'DailyLimitPerformance2',
         'st': '100',
         'apiv': 'w29',
         'Type': '5',
         'c': 'HisHomeDingPan',
         'PhoneOSNew': '1',
         'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
         'index': '0',
         'Day': req.body.data,
         'PidType': '5',
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         // console.log(body);
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         // console.log(data);
         res.send(data);
      }
   }

   request(options, callback);
})

//东方财富股票实时数据
app.post('/codes_rise', function (req, res) {
   if(!req.body.data){
      return null;
   }

   // let status = 0;
   let request = require('request');
   let stocks = req.body.data;
   if(stocks == false){
      return null;
   }
   let stock = '';
   // console.log('stocks='+stocks);
      //获取股票代码

         for(let i=0;i<stocks.length;i++){
            // if(stocks[i]=='000721'){
            //    console.log(stocks[i]);
            //    status = 1;
            // }
            if(stocks[i].slice(0,1)==6){
               // stocks[i]='1.'+stocks[i]+'%2C';
               stock = stock + '1.'+stocks[i]+'%2C';
            }else{
               // stocks[i]='0.'+stocks[i]+'%2C';
               stock = stock + '0.'+stocks[i]+'%2C';
            }
         }

   // console.log('req.body.data=' + req.body.data);

   const options = {
      url: 'http://push2.eastmoney.com/api/qt/ulist/get?fltt=1&invt=2&cb=jQuery351010838368397660503_1675494557241&fields=f3%2Cf12&secids='+stock+'&ut=fa5fd1943c7b386f172d6893dbfba10b&pn=1&np=1&pz=20&wbp2u=%7C0%7C0%7C0%7Cweb&_=1675494557502',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36',
         'referer': 'http://finance.sina.com.cn'
      },
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var regex3 = /\{.*\}/;  // {} 花括号，大括号
         // res.send(JSON.stringify(body.match(regex3)));// JSON格式化
         data = body.match(regex3)[0];
         // console.log(data);
         var data = eval('(' + data + ')')['data']['diff'];//json格式化数据
         //处理数据
         let json = {};
         for(let i=0;i<data.length;i++){
            let float = (data[i]['f3']/100).toFixed(2);
            json[data[i]['f12']]=float;
         }
         // if(status == 1){
         //    console.log(json);
         // }
         // console.log(json);
         res.send(json);
      }
   }
   request(options, callback);
})

//历史涨停的昨日四板及以上个股
app.post('/fourStocksYesterdayHistory', function (req, res) {
   if(!req.body.data){
      return null;
   }

   let request = require('request');
   // console.log('req.body.data=' + req.body.data);

   const options = {
      url: 'https://apphis.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
         'Order': '0',
         'a': 'DailyLimitPerformance',
         'st': '100',
         'apiv': 'w29',
         'Type': '4',
         'c': 'HisHomeDingPan',
         'PhoneOSNew': '1',
         'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
         'index': '0',
         'Day': req.body.data,
         'PidType': '5',
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         res.send(data);
      }
   }

   request(options, callback);
})

//历史未涨停的昨日3板个股
app.post('/threeStocksYesterdayHistory', function (req, res) {
   if(!req.body.data){
      return null;
   }

   let request = require('request');
   // console.log('req.body.data=' + req.body.data);

   const options = {
      url: 'https://apphis.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
         'Order': '0',
         'a': 'DailyLimitPerformance',
         'st': '100',
         'apiv': 'w29',
         'Type': '4',
         'c': 'HisHomeDingPan',
         'PhoneOSNew': '1',
         'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
         'index': '0',
         'Day': req.body.data,
         'PidType': '4',
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         res.send(data);
      }
   }

   request(options, callback);
})

//历史未涨停的昨日2板个股
app.post('/twoStocksYesterdayHistory', function (req, res) {
   if(!req.body.data){
      return null;
   }
   let request = require('request');
   const options = {
      url: 'https://apphis.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
         'Order': '0',
         'a': 'DailyLimitPerformance',
         'st': '100',
         'apiv': 'w29',
         'Type': '4',
         'c': 'HisHomeDingPan',
         'PhoneOSNew': '1',
         'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
         'index': '0',
         'Day': req.body.data,
         'PidType': '3',
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         res.send(data);
      }
   }

   request(options, callback);
})

//历史未涨停的昨日1板个股
app.post('/oneBoardStocksYesterdayHistory', function (req, res) {
   if(!req.body.data){
      return null;
   }
   let request = require('request');
   const options = {
      url: 'https://apphis.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
         'Order': '1',
         'a': 'DailyLimitPerformance2',
         'st': '100',
         'apiv': 'w29',
         'Type': '5',
         'c': 'HisHomeDingPan',
         'PhoneOSNew': '1',
         'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
         'index': '0',
         'Day': req.body.data,
         'PidType': '2',
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         res.send(data);
      }
   }

   request(options, callback);
})

//历史涨停的昨日1板个股
app.post('/oneStocksYesterdayHistory', function (req, res) {
   if(!req.body.data){
      return null;
   }
   let request = require('request');
   const options = {
      url: 'https://apphis.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
         'Order': '0',
         'a': 'DailyLimitPerformance',
         'st': '100',
         'apiv': 'w29',
         'Type': '4',
         'c': 'HisHomeDingPan',
         'PhoneOSNew': '1',
         'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
         'index': '0',
         'Day': req.body.data,
         'PidType': '2',
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         res.send(data);
      }
   }

   request(options, callback);
})

//历史涨停的1板个股
app.post('/oneStocksHistory', function (req, res) {
   if(!req.body.data){
      return null;
   }
   let request = require('request');
   const options = {
      url: 'https://apphis.longhuvip.com/w1/api/index.php',
      headers: {
         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
      },
      qs: {
         'Order': '0',
         'a': 'DailyLimitPerformance',
         'st': '100',
         'apiv': 'w29',
         'Type': '4',
         'c': 'HisHomeDingPan',
         'PhoneOSNew': '1',
         'DeviceID': 'ffffffff-fade-f24e-f9d3-785f00000000',
         'index': '0',
         'Day': req.body.data,
         'PidType': '1',
      }
   };

   function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
         var data = eval('(' + body + ')')['info'][0];//json格式化数据
         res.send(data);
      }
   }

   request(options, callback);
})
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function (req, res) {
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})


var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("应用实例，访问地址为 http://%s:%s", host, port)

})