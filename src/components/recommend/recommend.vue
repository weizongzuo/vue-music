<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <!-- 轮播图  v-if="recommends.length"确保已经拿到数据再渲染slider组件 -->
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img class="needsClick" :src="item.picUrl" alt @load="loadImage">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item" :key="item.imgurl">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" alt>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
          <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Slider from "base/slider/slider";
  import { getRecomend, getDiscList } from "api/recommend";
  import { ERR_OK } from "api/config";
  import Scroll from "base/scroll/scroll";
  import Loading from 'base/loading/loading'
  export default {
    data() {
      return {
        recommends: [],
        discList: []
      };
    },
    created() {
      this._getRecommend();
      // 执行该方法让获取后端接口代理得到的数据
      this._getDiscList();
    },
    methods: {
      _getRecommend() {
        // 这里是封装的promise
        getRecomend().then(res => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider;
          } else {
            // console.log(res)
          }
        });
      },
      _getDiscList() {
        // 这里是封装的promise
        getDiscList().then(res => {
          if (res.code === ERR_OK) {
            // 拿到后端接口代理请求的数据
            this.discList = res.data.list;
          } else {
            // 报错
          }
        });
      },
      loadImage() {
          if(!this.checkLoaded){
              // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
              this.$refs.scroll.refresh();
              this.checkLoaded = true;
          }
      }
    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  };
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable';

  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;

    .recommend-content {
      height: 100%;
      overflow: hidden;

      .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
      }

      .recommend-list {
        .list-title {
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-theme;
        }

        .item {
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px 20px 20px;

          .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
          }

          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: $font-size-medium;

            .name {
              margin-bottom: 10px;
              color: $color-text;
            }

            .desc {
              color: $color-text-d;
            }
          }
        }
      }

      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
