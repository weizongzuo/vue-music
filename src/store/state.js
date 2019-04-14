import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'
const state = {
  singer: {}, // 歌手
  playing: false, // 播放状态
  fullScreen: false, // 是否全屏
  playlist: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence,
  currentIndex: -1, // 当前播放的索引
  disc: {},
  topList: {},
  searchHistory: loadSearch()
}
export default state