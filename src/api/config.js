// QQ音乐H5 Query String Parameters
// https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1534951848565
// g_tk: 5381
// uin: 0
// format: json
// inCharset: utf-8
// outCharset: utf-8
// notice: 0
// platform: h5
// needNewCode: 1
// _: 1534950895842

// https://c.y.qq.com/splcloud/fcgi-bin/p.fcg?g_tk=5381&format=jsonp&jsonpCallback=jsonp1
// g_tk: 5381
// format: jsonp
// jsonpCallback: jsonp1
export const commonParams = {
  g_tk: 67232076,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'json'
}

export const options = {
  param: 'jsonpCallback'
}

export const ERR_OK = 0