<template>
    <transition name="slide">
    <div class="singer-detail"></div>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed:{
          // 使用对象展开运算符将 getter 混入 computed 对象中
          // 映射为 `this.$store.getters.singer
        ...mapGetters([
            'singer' // 对应getters里的singer
        ])
    },
    created(){
        console.log(this.singer,'ff')
    }
}
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
    import '~common/stylus/variable'

    .singer-detail
        position: fixed
        z-index: 100
        top:0
        left:0
        right:0
        bottom:0
        background:$color-background

    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>
