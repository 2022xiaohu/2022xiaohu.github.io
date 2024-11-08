const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// 设置视图引擎为ejs（这里假设使用ejs模板，你也可以换成其他如pug等，相应调整代码）
app.set('view engine', 'ejs');

// 定义路由，当访问根路径时渲染包含股票数据的页面
app.get('/', async (req, res) => {
    try {
        axios.get('https://qd.10jqka.com.cn/quote.php?cate=real&type=stock&return=json&callback=showStockData&code=301059')
        .then(response => {
               console.log(response.data);
           })
        .catch(error => {
               console.error('请求失败:', error);
           });

        res.render('index', { stockInfo });
    } catch (error) {
        console.error(error);
        res.status(500).send('获取股票数据失败');
    }
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});