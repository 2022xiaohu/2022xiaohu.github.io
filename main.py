
import hashlib
import json
import os
import time
from hashlib import md5
import datetime
# import data.wencai as wc
import pandas as pd
import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning
headers = {
    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 5.1.1; TAS-AN00 Build/TAS-AN00)',
    "Connection": "close"}

timeout = 5  # timeout修改了超时时间，以秒为单位

from flask import Flask, render_template, request, url_for
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)


# 接收前端的ajax请求
@app.route('/kaipanla', methods=['POST'])
@cross_origin()
def _kaipanla():
    if request.method == 'POST':
        data = []
        _data = request.form
        _data = kaipanla(_data)
        return _data


def kaipanla(data):
    # 构造URL请求、user-agent头文件
    url = 'https://apphis.longhuvip.com/w1/api/index.php'
    # headers = {
    #     'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 5.1.1; TAS-AN00 Build/TAS-AN00)'}

    session = requests.Session()
    # 禁用安全请求警告
    requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
    # dicts = {}
    try:
        html = session.post(url=url, data=data, headers=headers, verify=False, timeout=timeout).text
        html = json.loads(html)
    except Exception as spider_error:
        # print("获取昨日涨停今日未涨停表现 html抓取过程报错，错误信息为：%s" % spider_error)
        raise ValueError(spider_error)
        return None
    print(html)
    return html


# web 服务器
if __name__ == '__main__':
    app.debug = True  # 设置调试模式，生产模式的时候要关掉debug
    app.run(host="0.0.0.0", port=5000)
