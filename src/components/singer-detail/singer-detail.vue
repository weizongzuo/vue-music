<template>
  <transition name="slide">
    <music-list :songs='songs' :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
  import { mapGetters } from "vuex";
  import { getSingerDetail } from "api/singer";
  import { ERR_OK } from "api/config";
  import { createSong } from "common/js/song";
  import MusicList from 'components/music-list/music-list'
  export default {
    data() {
      return {
        songs: []
      };
    },
    components:{
      MusicList
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      // 使用对象展开运算符将 getter 混入 computed 对象中
      // 映射为 `this.$store.getters.singer
      ...mapGetters([
        "singer" // 对应getters里的singer
      ])
    },
    created() {
      this._getDetail();
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push("/singer");
          return;
        }
        // 拿到vuex传递过来的singer的id
        getSingerDetail(this.singer.id).then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list);
            console.log(this.songs)
          }
        });
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach(item => {
          let { musicData } = item;
          if(musicData.songid && musicData.albummid){
              ret.push(createSong(musicData))
          }
        });
        return ret;
      }
    }
  };
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
  import '~common/stylus/variable'

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
