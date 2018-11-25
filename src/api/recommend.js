import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config'
import axios from 'axios'

// 封装一个getRecomend()
// QQ音乐H5 https://c.y.qq.com 的数据
// 轮播图数据
export function getRecomend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5', // 平台
    notice: 0, // 未登录状态
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
// PC端歌单数据 https://y.qq.com/portal/playlist.html
export function getDiscList() {
  const url = '/api/getDiscList' // 地址来源于app.use('/api', apiRoutes)与apiRoutes.get('/getDiscList', function (req, res) {})

  const data = Object.assign({}, commonParams, {
    platform: 'yqq', // 平台
    hostUin: 0, // 未登录状态
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  // 这里为XMLHttpRequests，调用webpack.dev.conf.js中后端接口代理请求
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
