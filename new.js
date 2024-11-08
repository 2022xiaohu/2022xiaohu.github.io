const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// 使用cors中间件允许所有来源的跨域请求
app.use(cors());

// 处理 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: false }));

// 处理 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: false }));

// 设置静态文件目录为当前目录下的public文件夹
app.use(express.static('.'));

// 定义一个路由来接收前端发送的请求并转发到目标API
app.post('/apphis', async (req, res) => {
    try {
        // 将前端发送的数据转换为URLSearchParams格式
        const formData = new URLSearchParams();

        // console.log('req===>',req.body);
        for (const key in req.body) {
            // console.log('axios');
            formData.append(key, req.body[key]);
            // console.log('key req.body[key]',key,req.body[key]);
        }

        const response = await axios.post('https://apphis.longhuvip.com/w1/api/index.php', formData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        // console.log('axios');
        res.json(response.data);
        console.log(response.data);
    } catch (error) {
        console.error('转发请求出错：', error);
        // 区分不同类型的错误，返回更详细的错误信息给前端
        if (error.response) {
            res.status(error.response.status).json({ error: `请求失败，状态码: ${error.response.status}, 错误信息: ${error.response.data}` });
        } else if (error.request) {
            res.status(500).json({ error: '请求未发出，可能是网络问题' });
        } else {
            res.status(500).json({ error: '请求配置错误' });
        }
    }
});

// 新增处理 /new_api 路由的POST请求
app.post('/apphwhq', async (req, res) => {
    try {
        // 将前端发送的数据转换为URLSearchParams格式
        const formData = new URLSearchParams();
        for (const key in req.body) {
            formData.append(key, req.body[key]);
        }

        const response = await axios.post('https://apphwhq.longhuvip.com/w1/api/index.php ', formData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('转发请求出错：', error);
        // 区分不同类型的错误，返回更详细的错误信息给前端
        if (error.response) {
            res.status(error.response.status).json({ error: `请求失败，状态码: ${error.response.status}, 错误信息: ${error.response.data}` });
        } else if (error.request) {
            res.status(500).json({ error: '请求未发出，可能是网络问题' });
        } else {
            res.status(500).json({ error: '请求配置错误' });
        }
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`服务器运行在端口 ${port}`);
});