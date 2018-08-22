import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

// 封装一个getRecomend()
// QQ音乐H5 https://c.y.qq.com 的数据
export function getRecomend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5', // 平台
    notice: 0, // 未登录状态
    needNewCode: 1
  })
  return jsonp(url, data, options)
}