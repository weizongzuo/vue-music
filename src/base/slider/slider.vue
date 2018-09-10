<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item,index) in dots" :key="item" :class="{active:currentPageIndex===index}">
            </span>
        </div>
    </div>
</template>
<script>
// https://ustbhuangyi.github.io/better-scroll
import { addClass } from 'common/js/dom'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  //   name: 'slider',
  props: {
    //   循环
    loop: {
      type: Boolean,
      default: true
    },
    // 自动播放
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 时间间隔
    interval: {
      type: Number,
      default: 2000
    }
  },
  mounted() {
    //   浏览器刷新通常是17ms之后
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    // 文档视图调整大小时会触发 resize 事件
    window.addEventListener('resize', () => {
      // slider尚未初始化时
      if (!this.slider) {
        return
      }
      // 重新计算宽度
      this._setSliderWidth(true)
      // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
      this.slider.refresh()
    })
  },
  activated() {
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated() {
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  destroyed() {
    clearTimeout(this.timerss)
  },
  methods: {
    _setSliderWidth(isResize) {
      // 获取sliderGroup所在dom元素的children
      this.children = this.$refs.sliderGroup.children
      let width = 0
      // 可见区域宽（不包括滚动条与工具条）
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        // 每个child的宽度与sliderWidth是一致的
        child.style.width = sliderWidth + 'px'
        width += sliderWidth // 所有子元素总宽
      }
      // !isResize为限制在视窗改变时不加宽度
      if (this.loop && !isResize) {
        // 无缝轮播加需两个child宽度
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        // 在循环的时候默认在第一个元素添加了copy元素，所以需要减去
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    _play() {
      // 第N个元素
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.slider {
    min-height: 1px;

    .slider-group {
        position: relative;
        overflow: hidden;
        white-space: nowrap;

        .slider-item {
            float: left;
            box-sizing: border-box;
            overflow: hidden;
            text-align: center;

            a {
                display: block;
                width: 100%;
                overflow: hidden;
                text-decoration: none;
            }

            img {
                display: block;
                width: 100%;
            }
        }
    }

    .dots {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 12px;
        text-align: center;
        font-size: 0;

        .dot {
            display: inline-block;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: $color-text-l;

            &.active {
                width: 20px;
                border-radius: 5px;
                background: $color-text-ll;
            }
        }
    }
}
</style>