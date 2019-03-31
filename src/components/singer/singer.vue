<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" @select="selectSinger" ref="list"></list-view>
    <!-- 挂载子路由 -->
    <router-view></router-view>
  </div>
</template>
<script>
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Singer from "common/js/singer";
import ListView from "base/listview/listview";
import { mapMutations } from "vuex";
import singerDetail from "../singer-detail/singer-detail";
import { playlistMixin } from "common/js/mixin";

const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;
export default {
  mixins: [playlistMixin],
  data() {
    return {
      singers: []
    };
  },
  components: {
    ListView,
    singerDetail
  },
  created() {
    this._getSingerList();
  },
  methods: {
     // 这里组件的handlePlaylist()会覆盖mixin里的handlePlaylist()
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
         this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer); // this.setSinger(singer)映射为this.$store.commit('SET_SINGER',singer)
    },
    // 数据
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._mormalLizeSinger(res.data.list);
        } else {
          // 错误
        }
      });
    },
    // 处理为需要的数据结构
    _mormalLizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          // 热门
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }
        // 其他
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });
      console.log(map);
      // 处理map为需要的数据结构-有序列表
      let hot = [];
      let ret = [];
      // 遍历可枚举属性-for...in循环是以任意次序迭代，所以for...in不应该用于迭代一个 Array，其中索引顺序很重要，因为迭代的顺序是依赖于执行环境的，所以数组遍历不一定按次序访问元素。因此当迭代访问顺序很重要的数组时，最好用整数索引去进行for循环（或者使用 Array.prototype.forEach() 或 for...of 循环）
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      // 排序a-z/A-Z；sort()会直接修改原数组
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      // 合并
      console.log(hot.concat(ret));
      return hot.concat(ret);
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  }
};
</script>
<style lang="stylus" scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
