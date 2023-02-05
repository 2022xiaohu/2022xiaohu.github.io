var floatKChart_ = function () { function e(e, t) { var a = this; a.JQElment = e; a.JQElment.addClass("mpMChart_"); a.font = "Microsoft YaHei, Arial, Helvetica, sans-serif"; a.fontColor = { block: "#000", normal: "#555", gray: "#737373", red: "#e50012", green: "#306612" }; a.kType = t.kType; a.common = function () { var e = { chartType: { vol: 0 } }; e.showZoomBtn = t.showZoomBtn || false; return e }(); a.eventParam = {}; a.initCanvas("init"); a.event(); a.BGLine(); a.setData(t.data); a.GetComParam(); a.LoadImg() } var t = e.prototype; t.initCanvas = function (e) { var t = this; (function () { var e = t.JQElment.width(), a = t.JQElment.height(); t.w = t.gi(e - 1); t.h = t.gi(a - 1); t.tcH = t.gi(t.h * .7); t.bcH = t.gi(t.h * .3); t.dateH = 20; var i = "height:" + a + "px;", n = "height:" + t.tcH + "px;", l = "height:" + t.bcH + "px;top:" + t.tcH + "px;", r = "height:" + a + "px;", o = "top:" + t.tcH + "px;", d = "top:" + t.tcH + "px;height:" + t.dateH + "px;left:" + (t.w - 60) / 2 + "px;"; var f = '<canvas data-c="bg" width="' + e + '" height="' + a + '"  style="' + i + '"></canvas>' + '<canvas data-c="line" width="' + e + '" height="' + t.tcH + '" style="' + n + '"></canvas>' + '<canvas data-c="vol" width="' + e + '" height="' + t.bcH + '" style="' + l + '"></canvas>' + '<canvas data-c="over" width="' + e + '" height="' + a + '" style="' + r + '"></canvas>' + '<div class="zoomBar" style="' + d + '">' + '    <div class="enlarge"></div>' + '    <div class="narrow"></div>' + "</div>" + '<select class="vol-sel" style="' + o + '">' + '    <option data-type="0">成交量</option>' + '    <option data-type="1">成交额</option>' + "</select>"; t.JQElment.html(f); t.ctxBGE = t.JQElment.children('canvas[data-c="bg"]'); t.ctxBG = t.ctxBGE[0].getContext("2d"); t.ctxLineE = t.JQElment.children('canvas[data-c="line"]'); t.ctxLine = t.ctxLineE[0].getContext("2d"); t.ctxVolE = t.JQElment.children('canvas[data-c="vol"]'); t.ctxVol = t.ctxVolE[0].getContext("2d"); t.ctxOverE = t.JQElment.children('canvas[data-c="over"]'); t.ctxOver = t.ctxOverE[0].getContext("2d"); t.ctxBG.translate(.5, .5); t.ctxLine.translate(.5, .5); t.ctxVol.translate(.5, .5); t.ctxOver.translate(.5, .5) })() }; t.BGLine = function () { var e = this; var t = e.ctxBG; (function () { t.beginPath(); t.fillStyle = "#f5f5f5"; t.rect(0, e.tcH, e.w, e.dateH); t.fill(); t.closePath() })(); (function () { t.beginPath(); t.lineWidth = 1; t.strokeStyle = "#ddd"; var a = function () { var t = []; var a = e.tcH / 6; for (var i = 1; i < 6; i++) { t.push(e.gi(a * i)) } t.push(e.gi(e.tcH + e.dateH + (e.bcH - e.dateH) / 2)); return t }(); var i = a.length; for (var n = 0; n < i; n++) { var l = a[n]; e.DrawDotted(t, 0, l, e.w, l) } t.moveTo(0, e.tcH); t.lineTo(e.w, e.tcH); t.moveTo(0, e.tcH + e.dateH); t.lineTo(e.w, e.tcH + e.dateH); t.rect(0, 0, e.w, e.h); t.stroke(); t.closePath() })() }; t.GetComParam = function (e) { var t = T_ = this; var a = T_.common; if (!a.day_len_s) a.day_len_s = 7; if (e == "large") { if (a.day_len_s % 1 != 0) a.day_len_s = Math.ceil(a.day_len_s); else { if (a.day_len_s >= 6) a.day_len_s += .5; else if (a.day_len_s >= 3) a.day_len_s += .4; else if (a.day_len_s >= 1) a.day_len_s += .2; else a.day_len_s += .1 } if (a.day_len_s > 15) a.day_len_s = 15 } else if (e == "small") { if (a.day_len_s > 6) a.day_len_s -= .5; else if (a.day_len_s > 3) a.day_len_s -= .4; else if (a.day_len_s > 1) a.day_len_s -= .2; else a.day_len_s -= .1; if (a.day_len_s < .5) a.day_len_s = .5 } a.day_len = a.day_len_s; a.padding_l = 0; a.padding_r = 0; a.textPadding = 6; a.changeLineNum = 3; a.bar_len = t.gi(a.day_len * .7); if (a.day_len_s <= 6) { a.bar_len = a.day_len * (a.day_len_s / 10) } a.bar_padding_len = (a.day_len - a.bar_len) / 2; a.maxNumber = parseInt((T_.w - a.padding_l - a.padding_r) / a.day_len); var i = (T_.w - a.padding_l - a.padding_r) % a.day_len; a.padding_l = a.padding_l + i / 2; a.padding_r = a.padding_r + i / 2 }; t.DrawKLine = function () { var e = T_ = this, t, a = T_.ctxLine, i = T_.common; var n = { padding_t: 18, padding_b: 18, ChartH: e.tcH, changeLineNum: i.changeLineNum }; T_.clearCanvas(T_.ctxLineE, -.5, -.5, e.w + 1, e.tcH + 1); (function () { var a = e.data; t = { x: a.x.slice(i.start, i.end), k: a.k.slice(i.start, i.end), m5: a.m5.slice(i.start, i.end), m10: a.m10.slice(i.start, i.end), m20: a.m20.slice(i.start, i.end), m30: a.m30.slice(i.start, i.end) }; if (i.start != 0 && a.k[i.start - 1] != 0) t.yd = a.k[i.start - 1][1]; else t.yd = 0 })(); (function () { var e, a, l, r; var o = function (t) { if (t) { if (!e || t > e) e = t; if (!a || t < a) a = t } }; for (var d = 0; d < t.x.length; d++) { var f = t.k[d]; if (f) { if (!l || f[2] > l) l = f[2]; if (!r || f[3] < r) r = f[3] } if (l || r) { if (!e || !a) { e = l; a = r } else { if (l > e) e = l; if (r < a) a = r } } o(t.m5[d]); o(t.m10[d]); o(t.m20[d]); o(t.m30[d]) } t.max = e; t.min = a; t.kMax = l; t.kMin = r; var s = n.ChartH - (n.padding_t + n.padding_b); var c = (e - a) / s; i.yMax_k = e + c * n.padding_t; i.yMin_k = a - c * n.padding_b })(); var l = function (e, a) { var i = n.ChartH - (n.padding_t + n.padding_b); var l = i - i * (e - t.min) / (t.max - t.min) + n.padding_t; if (!a) return T_.gi(l); else return l }; var r = { data: t.k, ctx: a, yd: t.yd, padding_t: n.padding_t, padding_b: n.padding_b, ChartH: e.tcH, max: t.max, min: t.min }; (function () { var n = t.x.length; if (n == 0) return; a.fillStyle = e.fontColor.normal; a.textBaseline = "bottom"; a.textAlign = "left"; var l = i.textPadding, r = e.tcH - 2; a.fillText(T_.GetDateText(t.x[0]), l, r); a.textAlign = "right"; l = T_.w - i.textPadding; a.fillText(T_.GetDateText(t.x[n - 1]), l, r) })(); T_.DrawK(r); (function () { var e = t.yd; var a = t.x.length; for (var n = 0; n < a; n++) { var r = t.k[n]; if (!r) continue; var o = null, d = null, f = null, s = null; (function () { if (o == null || d == null || f == null || s == null) { var e = i.padding_l + n * i.day_len; o = T_.gi(e + i.day_len / 2); d = l(r[2]); f = o; s = l(r[3]) } })(); (function () { if (r[2] == t.kMax) { var e = o, a = d; if (o === null || d === null) { var c = i.padding_l + n * i.day_len; e = T_.gi(c + i.day_len / 2); a = l(r[2]) } t.maxAxis = { x: e, y: a } } if (r[3] == t.kMin) { var e = f, a = s; if (f === null || s === null) { var c = i.padding_l + n * i.day_len; e = T_.gi(c + i.day_len / 2); a = l(r[3]) } t.minAxis = { x: e, y: a } } })() } })(); (function () { r.data = t.m5; r.color = "#333333"; T_.DrawL(r); r.data = t.m10; r.color = "#dcab01"; T_.DrawL(r); r.data = t.m20; r.color = "#d6417d"; T_.DrawL(r); r.data = t.m30; r.color = "#389a7c"; T_.DrawL(r) })(); (function () { var e = t.x.length; if (e == 0) return; a.fillStyle = "#000"; a.textBaseline = "middle"; a.font = 12 + "px " + T_.font; var n = i.day_len / 2; var r = 20; var o = 12; var d = 3; var f = t.maxAxis; if (f) { if (f.x <= T_.w / 2) { a.textAlign = "left"; var s = t.k[f.index + 1]; if (s && l(s[1]) < f.y + d) f.y -= d; a.fillText(t.kMax, f.x + n + r, f.y); a.drawImage(T_.arrowImg, 0, 0, 54, 32, f.x + n, f.y - o / 2, r, o) } else { a.textAlign = "right"; var s = t.k[f.index - 1]; if (s && l(s[1]) < f.y + d) f.y -= d; a.fillText(t.kMax, f.x - n - r, f.y); a.drawImage(T_.arrowImg, 54, 0, 54, 32, f.x - n - r, f.y - o / 2, r, o) } } f = t.minAxis; if (f) { if (f.x <= T_.w / 2) { a.textAlign = "left"; var s = t.k[f.index + 1]; if (s && l(s[0]) > f.y - d) f.y += d; a.fillText(t.kMin, f.x + n + r, f.y); a.drawImage(T_.arrowImg, 0, 0, 54, 32, f.x + n, f.y - o / 2, r, o) } else { a.textAlign = "right"; var s = t.k[f.index - 1]; if (s && l(s[0]) > f.y - d) f.y += d; a.fillText(t.kMin, f.x - n - r, f.y); a.drawImage(T_.arrowImg, 54, 0, 54, 32, f.x - n - r, f.y - o / 2, r, o) } } })(); e.drawCheckedInfo() }; t.DrawK = function (e) { var t = this, a = e.data, i = e.ctx, n = t.common; var l = function (a, i) { var n = e.ChartH - (e.padding_t + e.padding_b); var l = n - n * (a - e.min) / (e.max - e.min) + e.padding_t; if (!i) return t.gi(l); else return l }; var r = function (a) { var r = a > 0 ? "#e93030" : "#306612"; i.beginPath(); i.lineWidth = 1; i.strokeStyle = r; i.fillStyle = r; var o = e.yd; var d = e.data.length; for (var f = 0; f < d; f++) { var s = e.data[f]; if (s) { var c, v, _, m, g; if (a < 0 && (s[0] > s[1] || s[0] == s[1] && s[1] < o)) { g = n.padding_l + f * n.day_len; c = t.gi(g + n.day_len / 2); v = l(s[2]); i.moveTo(c, v); v = l(s[3]); i.lineTo(c, v); if (n.day_len_s > n.changeLineNum) { c = t.gi(g + n.bar_padding_len); v = l(s[0]); m = t.gi(l(s[1], true) - l(s[0], true)); if (m <= 0) { i.moveTo(c, v); i.lineTo(c + n.bar_len, v) } else { i.rect(c, v, n.bar_len, m) } } } else if (a > 0 && (s[0] < s[1] || s[0] == s[1] && s[1] >= o)) { g = n.padding_l + f * n.day_len; if (n.day_len_s > n.changeLineNum) { c = t.gi(g + n.day_len / 2); v = l(s[2]); i.moveTo(c, v); v = l(s[1]); i.lineTo(c, v); v = l(s[0]); i.moveTo(c, v); v = l(s[3]); i.lineTo(c, v); c = t.gi(g + n.bar_padding_len); v = l(s[1]); m = t.gi(l(s[0], true) - l(s[1], true)); if (m <= 0) { i.moveTo(c, v); i.lineTo(c + n.bar_len, v) } else { i.rect(c, v, n.bar_len, m) } } else { c = t.gi(g + n.day_len / 2); v = l(s[2]); i.moveTo(c, v); v = l(s[3]); i.lineTo(c, v) } } o = s[1] } else { o = 0 } } i.stroke(); if (a < 0) i.fill(); i.closePath() }; r(1); r(-1) }; t.DrawL = function (e) { var t = this, a = e.ctx, i = t.common, n = e.max < 0 ? -e.min - -e.max : e.max - e.min; var l = function (a, i) { var l = e.min; if (e.min < 0) { a += -e.min; l = 0 } var r = e.ChartH - (e.padding_t + e.padding_b); var o = r - r * (a - l) / n + e.padding_t; if (!i) return t.gi(o); else return o }; a.beginPath(); a.lineJoin = "bevel"; a.lineWidth = 1; a.strokeStyle = e.color; var r = false; for (var o = 0; o < e.data.length; o++) { var d = e.data[o]; if (!isNaN(d)) { var f = i.padding_l + o * i.day_len; var s = t.gi(f + i.day_len / 2); var c = l(d); if (!r) { a.moveTo(s, c); r = true } else { a.lineTo(s, c) } } } a.stroke(); a.closePath() }; t.setData = function (e) { var t = this; var a = e.x.length; var i = { x: e.x, k: [], m5: [], m10: [], m20: [], m30: [], vol: { l: [], e: [] } }; var n = function (e, t) { t = t === undefined ? NaN : t; if (!e) e = []; if (e.length > a) e = e.slice(0, a); else if (e.length < a) { for (var i = e.length; i < a; i++) { e.push(t) } } return e }; i.k = n(e.k); i.m5 = n(e.m5); i.m10 = n(e.m10); i.m20 = n(e.m20); i.m30 = n(e.m30); i.vol = { l: n(e.vol.l), e: n(e.vol.e) }; this.data = i }; t.DrawOverall = function (e, t) { var a = this; var i = a.data.x.length; if (!t) t = {}; var n = true; var l = a.common; if (e == "endDate") { if (i > l.maxNumber) { var r = a.data.x.indexOf(t.date); if (r > -1) { if (r + 1 >= l.maxNumber) { l.start = r + 1 - l.maxNumber; l.end = r + 1 } else { l.start = 0; l.end = l.maxNumber } } else { l.start = i - l.maxNumber; l.end = i } } else { l.start = 0; l.end = i } if (a.event.hasCheck) a.DrawRulerLine() } else if (e == "redraw" || !l.start && l.start != 0 || !l.end) { if (i > l.maxNumber) { l.start = i - l.maxNumber; l.end = i } else { l.start = 0; l.end = i } } else if (e == "large") { l.start = l.end - l.maxNumber; if (l.start < 0) l.start = 0; if (t.selIndex) { if (l.start > t.selIndex) { l.start = t.selIndex; l.end = l.start + l.maxNumber } } } else if (e == "small") { l.start = l.end - l.maxNumber; if (l.start < 0) { l.start = 0; l.end = l.maxNumber; var i = a.data.x.length; if (l.end > i) l.end = i } } else if (e == "left") { var o = t.moveLen ? t.moveLen : 1; if (o > l.start) o = l.start; if (l.start == 0) { n = false } else { l.start -= o; l.end -= o } } else if (e == "right") { var i = a.data.x.length; var o = t.moveLen ? t.moveLen : 1; if (o > i - l.end) o = i - l.end; if (l.end == i) { n = false } else { l.start += o; l.end += o } } else if (e == "move") { var i = a.data.x.length; var d = t.move; if (t.type == "left") { var f = i - 1 - t.end; if (d > f) d = f; if (d > 0) { l.start = t.start + d; l.end = t.end + d } else { n = false } } else { var f = t.start; if (d > f) d = f; if (d > 0) { l.start = t.start - d; l.end = t.end - d } else { n = false } } } if (n) { a.DrawKLine(); a.DrawVol() } return n }; t.LoadImg = function (e, t) { var a = this; a.arrowImg = new Image; a.arrowImg.src = $_.fileUrl + "plug-in/fixChart/arrows.png"; var i = function () { if (t) t(); if (e) a.DrawOverall("endDate", { date: e }); else a.DrawOverall("redraw") }; if (a.arrowImg.complete) { i() } else { a.arrowImg.onload = function () { i() } } }; t.GetDateText = function (e, t) { if (!t) t = "/"; e = e + ""; var a = e; if (e.length >= 8) { var i = e.substr(6); if (i.length == 4) i = i.substr(0, 2) + " " + i.substr(2); else if (i.length == 6) i = i.substr(0, 2) + " " + i.substr(2, 2) + ":" + i.substr(4); a = e.substr(0, 4) + t + e.substr(4, 2) + t + i } return a }; t.DrawVol = function (e) { var t = T_ = this, a, i = T_.common; var n = { padding_t: T_.dateH, ChartH: t.bcH - 1, changeLineNum: i.changeLineNum }; var l = i.chartType.vol; if (e == undefined) { e = i.chartType.vol } i.chartType.vol = e; T_.clearCanvas(T_.ctxVolE, -.5, -.5, T_.w + 1, t.bcH + 1); (function () { a = { x: T_.data.x.slice(i.start, i.end), k: T_.data.k.slice(i.start, i.end) }; if (e == 0) a.vol = T_.data.vol.l.slice(i.start, i.end); else if (e == 1) a.vol = T_.data.vol.e.slice(i.start, i.end); if (i.start != 0 && T_.data.k[i.start - 1]) a.yd = T_.data.k[i.start - 1][1]; else a.yd = 0 })(); T_.DrawBomChart(e, { ctx: T_.ctxVol, data: a, param: n }); t.drawCheckedInfo() }; t.DrawBomChart = function (e, t) { var a = T_ = this, i = T_.common, n = t.data, l = t.ctx, r = t.param; i.chartType.init = e; switch (e) { case 0: case 1: { (function () { var e = Math.max.apply(Math, n.vol); var t = function (t) { var i = (r.ChartH - r.padding_t) * t / e; return a.gi(i) }; (function () { l.beginPath(); l.lineWidth = 1; l.strokeStyle = "#306612"; l.fillStyle = "#306612"; if (i.day_len_s <= r.changeLineNum) l.lineWidth = 1; var e = n.yd; for (var o = 0; o < n.x.length; o++) { var d = n.k[o]; var f = n.vol[o]; if (f) { var s, c, v, _; if (d[0] > d[1] || d[0] == d[1] && d[1] < e) { var m = i.padding_l + o * i.day_len; s = T_.gi(m + i.bar_padding_len); _ = t(f); c = a.gi(r.ChartH - _); if (i.day_len_s > r.changeLineNum) { l.rect(s, c, i.bar_len, _) } else { s = T_.gi(m + i.day_len / 2); l.moveTo(s, c); c = r.ChartH; l.lineTo(s, c) } } e = d[1] } else { e = 0 } } l.stroke(); l.fill(); l.closePath() })(); (function () { l.beginPath(); l.lineWidth = 1; l.strokeStyle = "#e93030"; if (i.day_len_s <= r.changeLineNum) l.lineWidth = T_.DPR; var e = n.yd; for (var o = 0; o < n.x.length; o++) { var d = n.k[o]; var f = n.vol[o]; if (f) { var s, c, v, _; if (d[0] < d[1] || d[0] == d[1] && d[1] >= e) { var m = i.padding_l + o * i.day_len; s = T_.gi(m + i.bar_padding_len); _ = t(f); c = a.gi(r.ChartH - _); if (i.day_len_s > r.changeLineNum) { l.rect(s, c, i.bar_len, _) } else { s = T_.gi(m + i.day_len / 2); l.moveTo(s, c); c = r.ChartH; l.lineTo(s, c) } } e = d[1] } else { e = 0 } } l.stroke(); l.closePath() })(); (function () { if (n.x.length == 0) return; if (isNaN(e)) e = 0; l.font = 13 * T_.DPR + "px " + T_.family; l.fillStyle = "#474948"; l.textAlign = "left"; l.textBaseline = "middle"; var t = i.textPadding, a; if (T_.chartType == 1) a = T_.MidHeight * T_.DPR / 2; else a = (T_.MidHeight * T_.DPR - T_.TopTextH) / 2 + T_.TopTextH; var r; if (isNaN(e)) r = 0; else r = T_.getStanDet(e / 2); l.fillText(r, t, a) }) })() } break } }; t.drawCheckedInfo = function (e, t) { t = t === false ? false : true; var a = T_ = this, i = T_.ctxOver, n = T_.common, l = a.data, r = T_.event.hasCheck; if (t) a.clearCanvas(a.ctxOverE, -.5, -.5, a.w + 1, a.h + 1); var o = 8, d = 15, f = (d - 1) / 2 + 1, s = 10; var c = 12; i.font = c + "px " + T_.font; i.fillStyle = a.fontColor.normal; i.textAlign = "left"; i.textBaseline = "middle"; e = e === undefined ? a.data.x.length - 1 : e; var v = function (e, t, n, l) { e = a.gi(e); t = a.gi(t); n = a.gi(n); i.beginPath(); i.lineJoin = "bevel"; i.lineWidth = 1; i.strokeStyle = l; i.moveTo(e, t); i.lineTo(e, n); var r = 2, o = 4; if (t > n) { i.moveTo(e - r, n + o); i.lineTo(e, n); i.lineTo(e + r, n + o) } else { i.moveTo(e - r, n - o); i.lineTo(e, n); i.lineTo(e + r, n - o) } i.stroke(); i.closePath() }; (function () { if (!r) return; i.textBaseline = "top"; var t = o; var a = function (e, a) { i.fillStyle = a; i.fillText(e, t, 0); t += i.measureText(e).width + o }; var n = l.m5[e], d = l.m10[e], f = l.m20[e], s = l.m30[e]; if (n) a("MA5:" + n.toFixed(2), "#333"); if (d) a("MA10:" + d.toFixed(2), "#dcab01"); if (f) a("MA20:" + f.toFixed(2), "#d6417d"); if (s) a("MA30:" + s.toFixed(2), "#389a7c") })(); (function () { i.beginPath(); i.fillStyle = a.fontColor.normal; i.textBaseline = "middle"; var t = n.textPadding, l = T_.tcH + T_.dateH / 2 - 1; var r; if (n.chartType.vol == 0) { if (!isNaN(T_.data.vol.l[e])) r = "成交量：" + T_.changeBigDetail(T_.data.vol.l[e]) } else if (n.chartType.vol == 1) { if (!isNaN(T_.data.vol.e[e])) r = "成交额：" + T_.changeBigDetail(T_.data.vol.e[e]) } if (r) i.fillText(r, t, l) })(); (function () { var t = n.chartType.sgle, l = n.textPadding, r = T_.msY2 + T_.dateH / 2 - 1; if (t == 40) { (function () { var t = T_.data.zb.zjje[e]; if (isNaN(t)) return; var a = "资金净额（成交金额30万以上）："; i.fillStyle = "#474948"; i.fillText(a, l, r); i.closePath(); var n = 4, o = i.measureText(a).width + n; if (t > 0) i.fillStyle = "#e60715"; else if (t < 0) i.fillStyle = "#25990e"; else i.fillStyle = "#474948"; a = (t / 1e4).toFixed(2) + "万"; i.fillText(a, o, r); i.closePath(); i.closePath() })() } else if (t == 41) { (function () { var t = parseFloat(T_.data.zb.ddje[e]); var a = !isNaN(t) ? "对倒金额：" + T_.changeBigDetail(t) : "对倒金额"; i.fillText(a, l, r) })() } else if (t == 42) { (function () { var t = "", a = !isNaN(T_.data.zb.ytje.y[e]), n = !isNaN(T_.data.zb.ytje.t[e]); if (a || n) { if (a) t += "压单金额：" + T_.changeBigDetail(T_.data.zb.ytje.y[e]) + " "; if (n) t += " 托单金额：" + T_.changeBigDetail(Math.abs(T_.data.zb.ytje.t[e])) } else { t = "压单托单金额" } i.fillText(t, l, r) })() } else if (t == 43) { (function () { var t = "主力活跃度：" + T_.data.zb.zlhy[e]; i.fillText(t, l, r) })() } else if (t == 20) { (function () { var t = ""; var n = o, d = 0; i.fillStyle = a.fontColor.normal; t = "MACD(" + a.data.zb.macd.s + "," + a.data.zb.macd.l + "," + a.data.zb.macd.m + ")"; i.fillText(t, n, r); d += i.measureText(t).width + n; var f = function (e, a, o) { i.fillStyle = o; var f = l + d; t = e + ":"; i.fillText(t, f, r); d += i.measureText(t).width; i.closePath(); f = l + d; t = !isNaN(a) ? (a > 0 ? "+" : "") + a.toFixed(2) : "——"; i.fillText(t, f, r); d += i.measureText(t).width + n; i.closePath() }; var s = T_.data.zb.macd.MACD[e], c = T_.data.zb.macd.DIF[e], v = T_.data.zb.macd.DEA[e]; f("MACD", s, s > 0 ? "#e93030" : s < 0 ? "#306612" : "#474948"); f("DIFF", c, "#000000"); f("DEA", v, "#dcab01"); i.closePath() })() } else if (t == 21) { (function () { var t = ""; var o = n.textPadding, d = 0; i.fillStyle = a.fontColor.normal; t = "KDJ(" + a.data.zb.kdj.n + "," + a.data.zb.kdj.m1 + "," + a.data.zb.kdj.m2 + ")"; i.fillText(t, o, r); d += i.measureText(t).width + o; var f = function (e, a, n) { i.fillStyle = n; var f = l + d; t = e + ":"; i.fillText(t, f, r); d += i.measureText(t).width; i.closePath(); f = l + d; t = !isNaN(a) ? (a > 0 ? "+" : "") + a.toFixed(2) : "——"; i.fillText(t, f, r); d += i.measureText(t).width + o; i.closePath() }; f("K", T_.data.zb.kdj.k[e], "#000000"); f("D", T_.data.zb.kdj.d[e], "#ee9d00"); f("J", T_.data.zb.kdj.j[e], "#fe576e"); i.closePath() })() } else if (t == 22) { (function () { var t = ""; var o = n.textPadding, d = 0; i.fillStyle = a.fontColor.normal; t = "RSI(" + a.data.zb.rsi.N1 + "," + a.data.zb.rsi.N2 + "," + a.data.zb.rsi.N3 + ")"; i.fillText(t, o, r); d += i.measureText(t).width + o; var f = function (e, a, n) { i.fillStyle = n; var f = l + d; t = e + ":"; i.fillText(t, f, r); d += i.measureText(t).width; i.closePath(); f = l + d; t = !isNaN(a) ? (a > 0 ? "+" : "") + a.toFixed(2) : "——"; i.fillText(t, f, r); d += i.measureText(t).width + o; i.closePath() }; f("RSI" + T_.data.zb.rsi.N1, T_.data.zb.rsi.RSI1[e], "#000000"); f("RSI" + T_.data.zb.rsi.N2, T_.data.zb.rsi.RSI2[e], "#ee9d00"); f("RSI" + T_.data.zb.rsi.N3, T_.data.zb.rsi.RSI3[e], "#fe576e"); i.closePath() })() } else if (t == 23) { (function () { var t = ""; var o = n.textPadding, d = 0; i.fillStyle = a.fontColor.normal; t = "BOLL(" + a.data.zb.boll.M + ")"; i.fillText(t, o, r); d += i.measureText(t).width + o; var f = function (e, a, n) { i.fillStyle = n; var f = l + d; t = e + ":"; i.fillText(t, f, r); d += i.measureText(t).width; i.closePath(); f = l + d; t = !isNaN(a) ? (a > 0 ? "+" : "") + a.toFixed(2) : "——"; i.fillText(t, f, r); d += i.measureText(t).width + o; i.closePath() }; f("BOLL", T_.data.zb.boll.BOLL[e], "#3e8ef1"); f("UB", T_.data.zb.boll.UB[e], "#e93030"); f("LB", T_.data.zb.boll.LB[e], "#319b1c"); i.closePath() })() } })() }; t.zjRange = function () { var e = this; var t = e.range; if (e.data.range.length < 2) { if (e.data.range.length == 1) e.eventParam.rangeChangeCB.call(e, 0, 0); t.siBlock.hide(); return } else { t.siBlock.show() } var a, i, n, l; (function () { if (t.isCheck) { var r = e.range.left_b[0].offsetLeft, o = e.range.right_b[0].offsetLeft; var d = e.range.mid; n = r + d; l = o + d; a = e.gi(n / t.rangeLen); i = e.gi(l / t.rangeLen); if (a < 0) a = 0; if (i > e.data.range.length - 1) i = e.data.range.length - 1 } else { a = 0; i = e.data.range.length - 1; n = a * t.rangeLen; l = i * t.rangeLen } })(); (function () { if (t.isCheck) return; var a = e.range.mid; var i = n - a, r = l - a; t.left_b.css({ left: i + "px" }); t.right_b.css({ left: r + "px" }) })(); (function () { var r = e.ctxBar; var o = l - n; e.clearCanvas(e.ctxBarE, -1, -1, e.w + 2, e.bcH + 2); (function () { r.beginPath(); if (t.isCheck) { r.strokeStyle = "#cf0f0f"; r.fillStyle = "#cf0f0f" } else { r.strokeStyle = "#bebebe"; r.fillStyle = "#bebebe" } var a = n, i = e.gi(e.range.bh - 5) - 1, l = e.gi(e.range.midY - i / 2), d = e.gi(o); r.rect(a, l, d, i); r.fill(); r.stroke(); r.closePath() })(); (function () { if (!t.isCheck) return; var d = 48, f = 20, s = e.range.bh * 1.7, c = 6, v = 6, _ = e.data.range[a].Time, m = e.data.range[i].Time; var g = function (t, a, i) { if (t < d / 2) t = d / 2; else if (t > e.w - d / 2) t = e.w - d / 2; r.beginPath(); r.strokeStyle = "#cf0f0f"; r.fillStyle = "#fff"; r.lineJoin = "round"; var n = e.gi(t - d / 2), l = e.gi(t + d / 2), o = e.gi(e.range.midY + s), _ = o + f; r.moveTo(l, o); r.lineTo(l, _); r.lineTo(n, _); r.lineTo(n, o); (function () { if (Math.abs(t - a) > d / 2) return; var i = e.gi(a), f = o - c, s = i - v / 2, _ = o, m = i + v / 2, g = o; if (s < n) { s = n; m = n + v } else if (m > l) { m = l; s = l - v } r.lineTo(s, _); r.lineTo(i, f); r.lineTo(m, g) })(); r.lineTo(l, o); r.fill(); r.stroke(); r.closePath(); r.beginPath(); r.font = 13 + "px " + e.font; r.textBaseline = "middle"; r.textAlign = "center"; r.fillStyle = "#cf0f0f"; r.fillText(i, t, o + f / 2) }; if (n >= d / 2 && l <= e.w - d / 2) { if (o > d) { g(n, n, _); g(l, l, m) } else { var h = n + o / 2; g(h - d / 2, n, _); g(h + d / 2, l, m) } } else { var T = d * 1.5; if (o > T) { g(n, n, _); g(l, l, m) } else { if (n < d / 2) { g(n, n, _); g(o > T ? l : T, l, m) } else { g(o > T ? n : e.w - T, n, _); g(l, l, m) } } } })(); (function () { var a = e.ctxRange; e.clearCanvas(e.ctxRangeE, -1, -1, e.w + 2, e.bsY + 2); if (!t.isCheck) return; a.beginPath(); a.lineWidth = 1; a.strokeStyle = "#4691ef"; a.fillStyle = "rgba(195,220,255,0.4)"; var i = e.gi(n), r = 0, o = e.gi(l - n), d = e.bsY; a.rect(i, r, o, d); a.fill(); a.beginPath(); e.DrawDotted(a, i, 0, i, d); e.DrawDotted(a, e.gi(l), 0, e.gi(l), d); a.stroke() })() })(); e.eventParam.rangeChangeCB.call(e, a, i) }; t.drawRulerLine = function (e, t) { var a = T_ = this, i, n = T_.ctxOver, l = T_.common; a.clearCanvas(a.ctxOverE, -1, -1, a.w + 2, a.h + 2); if (T_.data.x.length == 0) return; if (!e || !t) { T_.event.hasCheck = false; a.drawCheckedInfo(); return } else { T_.event.hasCheck = true } var r = function () { var t = parseInt((e - l.padding_l) / l.day_len); if (t > T_.data.x.length - 1) t = T_.data.x.length - 1; else if (t > l.maxNumber - 1) t = l.maxNumber - 1; else if (t < 0) t = 0; return t }(); var o = l.start + r; e = l.padding_l + r * l.day_len + l.day_len / 2; e = T_.gi(e); t = function () { var e = T_.gi(t); var i = a.tcH; if (e > i) e = i; else if (e < 0) e = 0; return e }(); (function () { n.beginPath(); n.lineWidth = 1; n.strokeStyle = "#000"; n.fillStyle = "#f2f2f2"; n.moveTo(e, 0); n.lineTo(e, T_.gi(T_.tcH)); n.moveTo(e, T_.gi(T_.tcH + a.dateH)); n.lineTo(e, T_.gi(a.h)); a.DrawDotted(n, 0, t, a.w, t); n.stroke(); n.closePath() })(); T_.drawCheckedInfo(o, false); if (o > T_.data.x.length - 1) return; (function () { n.beginPath(); n.lineWidth = 1 / 3; n.strokeStyle = "#000"; n.fillStyle = "rgba(240,240,240,0.8)"; n.font = 12 + "px " + T_.font; var a = T_.tcH; var i = (a - t) / a * (l.yMax_k - l.yMin_k) + l.yMin_k; i = i.toFixed(2); var r = 5; var d = 16, f = T_.gi(n.measureText(i).width + r), s = T_.gi(t - d / 2); n.clearRect(0, s, f, d); n.rect(0, s, f, d); var c = T_.GetDateText(T_.data.x[o]), v = T_.gi(n.measureText(c).width + r), _ = 18, m = T_.gi(a - _ - 1); var g = T_.gi(e - v / 2); if (g < 0) g = 0; else if (g > T_.w - v) g = T_.gi(T_.w - v); n.rect(g, m, v, _); n.fill(); n.stroke(); n.closePath(); n.beginPath(); n.fillStyle = "#000"; n.textAlign = "center"; n.textBaseline = "middle"; n.fillText(i, f / 2, t); n.fillText(c, g + v / 2, m + _ / 2) })(); (function () { var t = a.data.k[o]; if (!t) return; var i = 110, l = 128; var r = 60, d = 17; if (e < a.w / 2) r = a.w - i - 10; n.beginPath(); n.lineWidth = 1; n.strokeStyle = "#ddd"; n.fillStyle = "#fff"; n.rect(r, d, i, l); n.fill(); n.stroke(); n.closePath(); n.beginPath(); n.font = 12 + "px " + T_.font; n.textAlign = "left"; n.textBaseline = "middle"; n.fillStyle = a.fontColor.normal; var f = 17, s = 48; var c = d + 5 + f / 2, v = r + 5; n.fillText("开盘价：", v, c); n.fillText("收盘价：", v, c + f); n.fillText("最高价：", v, c + 2 * f); n.fillText("最低价：", v, c + 3 * f); n.fillText("昨收价：", v, c + 4 * f); n.fillText("涨跌幅：", v, c + 5 * f); n.fillText("涨跌额：", v, c + 6 * f); var _ = function () { var e = a.data.k[o - 1]; if (e) return e[1]; else return 0 }(); var m = function (e) { e = parseFloat(e); if (_) { if (e > _) return a.fontColor.red; else if (e < _) return a.fontColor.green; else return a.fontColor.block } else return a.fontColor.block }; v += s; c = d + 5 + f / 2; n.fillStyle = m(t[0]); n.fillText(parseFloat(t[0]).toFixed(2), v, c); n.fillStyle = m(t[1]); n.fillText(parseFloat(t[1]).toFixed(2), v, c + f); n.fillStyle = m(t[2]); n.fillText(parseFloat(t[2]).toFixed(2), v, c + 2 * f); n.fillStyle = m(t[3]); n.fillText(parseFloat(t[3]).toFixed(2), v, c + 3 * f); var g = _ ? parseFloat(_).toFixed(2) : "-- --"; n.fillStyle = a.fontColor.block; n.fillText(g, v, c + 4 * f); var g = (t[1] - _) / _ * 100; n.fillStyle = g > 0 ? a.fontColor.red : g < 0 ? a.fontColor.green : a.fontColor.block; g = !_ ? "-- --" : parseFloat(g).toFixed(2) + "%"; n.fillText(g, v, c + 5 * f); var g = t[1] - _; g = !_ ? "-- --" : parseFloat(g).toFixed(2); n.fillText(g, v, c + 6 * f); n.closePath() })(); return { x: e, y: t, selIndex: o } }; t.reDrawSectionLen = function (e) { var t = this; if (!e || e < 0) e = 0; else if (e > 49) e = 49; t.scale.len = e; if (t.scale.OPtionState != 2) { t.drawScale(t.scale.OPtionState) } }; t.DrawDotted = function (e, t, a, i, n) { var l = 2, r = 3; var o = Math.abs(i - t), d = Math.abs(n - a), f = Math.sqrt(Math.pow(o, 2) + Math.pow(d, 2)); var s = l * o / f, c = l * d / f, v = r * o / f, _ = r * d / f; var m = f / (l + r); for (var g = 0; g < m; g++) { var h = (s + v) * g + t, T = (c + _) * g + a, x = h + s, u = T + c; h = this.gi(h); T = this.gi(T); x = this.gi(x); u = this.gi(u); e.moveTo(h, T); e.lineTo(x, u) } }; t.gi = function (e) { var t = .5 + e | 0; t = .5 + e; t = .5 + e << 0; return t }; t.clearCanvas = function (e, t, a, i, n) { e[0].getContext("2d").clearRect(t, a, i, n); e.hide(); e[0].offsetHeight; e.show() }; t.changeBigDetail = function (e, t) { t = t != undefined ? t : 2; var a = parseFloat(e); if (a > 99999999) { a = a / 1e8; if (a > 9999) a = (a / 1e4).toFixed(2) + "万"; else a = a.toFixed(2); a += "亿" } else if (a > 9999) a = (a / 1e4).toFixed(2) + "万"; return a }; t.unique = function (e) { var t = []; var a = {}; for (var i = 0; i < e.length; i++) { if (!a[e[i]]) { t.push(e[i]); a[e[i]] = 1 } } return t }; t.event = function () { var e = this, t = e.common; e.event = { hasCheck: false }; e.JQElment.find('canvas[data-c="over"]').on("mousedown", function (a) { var i = a.offsetX; e.event.tMove = { sx: i, start: t.start, end: t.end, lastDiff: 0 } }).on("mousemove", function (a) { var i = a.offsetX, n = a.offsetY; var l = e.event.tMove; if (e.event.tMove) { var r = e.gi((i - l.sx) / t.day_len); if (r != l.lastDiff) { l.lastDiff = r; e.DrawOverall("move", { start: l.start, end: l.end, move: Math.abs(r), type: r < 0 ? "left" : "right" }) } } e.drawRulerLine(i, n) }).on("mouseout mouseleave", function (t) { delete e.event.tMove; e.drawRulerLine() }).on("mouseup", function (t) { delete e.event.tMove }); e.JQElment.find(".bonbar>.li").on("click", function () { var t = $(this), a = parseInt(t.attr("data-bon")); if (t.hasClass("atv")) return; t.addClass("atv").siblings(".atv").removeClass("atv"); e.DrawSingle(a); e.eventParam.switchZBCB.call(e, a) }); e.JQElment.find(".vol-sel").on("change", function () { var t = $(this); var a = t.children("option:selected").attr("data-type"); e.DrawVol(parseInt(a)) }); e.JQElment.find(".zoomBar>.enlarge").on("click mouseout mousemove", function () { window.clearTimeout(e.event.zoom_st); window.clearInterval(e.event.zoom_si) }).on("mousedown", function () { e.GetComParam("large"); e.DrawOverall("large"); e.event.zoom_st = setTimeout(function () { var t = 0; e.event.zoom_si = setInterval(function () { e.GetComParam("large"); e.DrawOverall("large"); t++; if (t >= 30) window.clearInterval(e.event.zoom_si) }, 50) }, 300) }).on("mouseup", function () { window.clearTimeout(e.event.zoom_st); window.clearInterval(e.event.zoom_si) }); e.JQElment.find(".zoomBar>.narrow").on("click mouseout mousemove", function () { window.clearTimeout(e.event.zoom_st); window.clearInterval(e.event.zoom_si) }).on("mousedown", function () { e.GetComParam("small"); e.DrawOverall("small"); e.event.zoom_st = setTimeout(function () { var t = 0; e.event.zoom_si = setInterval(function () { e.GetComParam("small"); e.DrawOverall("small"); t++; if (t >= 30) window.clearInterval(e.event.zoom_si) }, 50) }, 300) }).on("mouseup", function () { window.clearTimeout(e.event.zoom_st); window.clearInterval(e.event.zoom_si) }) }; t.roundRect = function (e, t, a, i, n, l) { if (i < 2 * l) l = i / 2; if (n < 2 * l) l = n / 2; e.moveTo(t + l, a); e.arcTo(t + i, a, t + i, a + n, l); e.arcTo(t + i, a + n, t, a + n, l); e.arcTo(t, a + n, t, a, l); e.arcTo(t, a, t + i, a, l) }; return e }();