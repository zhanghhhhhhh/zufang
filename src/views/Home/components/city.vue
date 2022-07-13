<template>
  <div class="contain">
    <van-nav-bar
      title="城市列表"
      left-arrow
      @click-left="$router.go(-1)"
      fixed
    />
    <div class="box"></div>
    <van-index-bar :index-list="indexList" :stickyOffsetTop="45">
      <!-- 当前城市 -->
      <!-- <van-index-anchor index="当前城市" />
      <van-cell title="北京" /> -->

      <!-- 所有城市 -->
      <div v-for="(val, keyword, index) in cityList" :key="index + '*'">
        <van-index-anchor :index="keyword" />

        <van-cell
          v-for="(item, ind) in val"
          :key="ind + '*'"
          :title="item.label"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getAllCity, getHotCity } from '@/api/city'
export default {
  created () {
    this.getAllCity()
    this.getHotCity()
  },
  data () {
    return {
      HotCityArr: [],
      AllCityArr: [],
      indexList1: ['#', '热'],
      indexList2: ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'Q', 'X', 'T', 'W', 'S', 'Y', 'Z'],
      obj: {}, // 获取筛选过后的数据
      cityList: {}// 筛选过后的数据不能直接用来进行循环
    }
  },
  methods: {
    async getAllCity () {
      const { data } = await getAllCity('1')
      this.AllCityArr = data.body
      console.log(this.AllCityArr)
      this.indexList.forEach(item => {
        this.obj[item] = []
        this.AllCityArr.forEach(item1 => {
          if (item === item1.pinyin.substring(0, 1).toUpperCase()) {
            this.obj[item].push(item1)
          }
        })
      })
      console.log(this.obj)
      // this.obj = this.$store.state.value.label
      this.obj.热 = this.HotCityArr
      this.cityList = this.obj
    },
    async getHotCity () {
      const { data } = await getHotCity()

      this.HotCityArr = data.body
    },

    onSent (id) {
      console.log(id)
      this.$store.commit('setValue', id)
      this.$router.push('search')
    }
  },
  computed: {
    indexList () {
      return [...this.indexList1, ...this.indexList2]
    }
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.contain {
  position: relative;
  overflow: hidden;
  .box {
    height: 100px;
  }
  /deep/.van-nav-bar {
    z-index: 9999;
  }
  /deep/.van-cell {
    border-bottom: 1px solid #f3f3f3;
  }
  /deep/.van-index-bar__sidebar {
    span {
      display: block;
      width: 50px;
      height: 50px;
      // line-height: 50px;
      margin-right: 20px;
    }
  }
  /deep/.van-index-bar__index {
    padding: 0px;
    line-height: 50px;
  }
  /deep/.van-index-bar__index--active {
    color: #fff;
    width: 15px;
    height: 15px;
    background-color: #21b97a;
    border-radius: 100%;
    font-size: 12px;
  }
}
</style>
