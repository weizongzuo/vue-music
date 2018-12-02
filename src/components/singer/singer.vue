<template>
  <div class="singer"></div>
</template>
<script>
  import { getSingerList } from "api/singer";
  import { ERR_OK } from "api/config";
  import Singer from 'common/js/singer'

  const HOT_NAME = "热门";
  const HOT_SINGER_LEN = 10;
  export default {
    data() {
      return {
        singers: []
      };
    },
    created() {
      this._getSingerList();
    },
    methods: {
      // 数据
      _getSingerList() {
        getSingerList().then(res => {
          if (res.code === ERR_OK) {
            this.singers = res.data.list;
            this._mormalLizeSinger(this.singers)
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
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name,
            }))
          }
          // 其他
          const key = item.Findex;
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            };
          }
          map[key].items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name,
            }));
        });
        console.log(map);
        // 处理map为需要的数据结构-有序列表
        let hot = []
        let ret = []
        // 遍历可枚举属性-for...in循环是以任意次序迭代，所以for...in不应该用于迭代一个 Array，其中索引顺序很重要，因为迭代的顺序是依赖于执行环境的，所以数组遍历不一定按次序访问元素。因此当迭代访问顺序很重要的数组时，最好用整数索引去进行for循环（或者使用 Array.prototype.forEach() 或 for...of 循环）
        for (let key in map){
            let val =  map[key]
            if(val.title.match(/[a-zA-Z]/)){
                ret.push(val);
            }else if(val.title===HOT_NAME){
                hot.push(val)
            }
        }
        // 排序a-z/A-Z；sort()会直接修改原数组
        ret.sort((a,b) =>{
            return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        // 合并
        console.log(hot.concat(ret))
        return hot.concat(ret);
      }
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
