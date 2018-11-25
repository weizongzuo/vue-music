<template>
    <div class="recommend">
        <div class="recommend-content">
            <!-- 轮播图  v-if="recommends.length"确保已经拿到数据再渲染slider组件 -->
            <div v-if="recommends.length" class="slider-wrapper">
                <slider>
                    <div v-for="item in recommends" :key="item.id">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl" alt="">
                        </a>
                    </div>
                </slider>
            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul></ul>
            </div>
        </div>
    </div>
</template>
<script>
import Slider from 'base/slider/slider'
import { getRecomend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
export default {
  data() {
    return {
      recommends: []
    }
  },
  created() {
    this._getRecommend()
     // 执行该方法让获取后端接口代理得到的数据
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      // 这里是封装的promise
      getRecomend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        } else {
          // console.log(res)
        }
      })
    },
    _getDiscList() {
      // 这里是封装的promise
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
            //拿到后端接口代理请求的数据
          console.log(res.data.list)
        } else {
          // 报错
        }
      })
    }
  },
  components: {
    Slider
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
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
