<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
        </div>
    </div>
</template>
<script>
// https://ustbhuangyi.github.io/better-scroll
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
  prop: {
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
      default: 4000
    }
  },
  mounted() {
    //   浏览器刷新通常是17ms之后
    setTimeout(() => {
      this._setSliderWidth()
      this._initSlider()
    }, 20)
  },
  methods: {
    _setSliderWidth() {
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
      if (this.loop) {
        // 无缝轮播加需两个child宽度
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      })
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