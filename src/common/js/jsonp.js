import originJSONP from 'jsonp' // 这里的jsonp即为npm安装的jsonp

// 封装一个通用的jsonp
export default function jsonp(url, data, option) {
  // url拼接
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    // jsonp结合promise使用
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // substring()去掉第一个&，如https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8
  return url ? url.substring(1) : ''
}