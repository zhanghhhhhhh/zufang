<template>
  <div>
    <van-card
      :title="myCardArr.title"
      :desc="myCardArr.desc"
      :thumb="'http://liufusong.top:8080' + myCardArr.houseImg"
      :price="myCardArr.price + '元/月'"
      @click="
        $router.push({
          name: 'articleInfo',
          params: { article_id: myCardArr.houseCode },
        })
      "
    >
      <template #tags>
        <van-tag
          text-color="#39becd"
          v-for="(obj, index) in myCardArr.tags"
          :key="index"
          >{{ obj }}</van-tag
        >
      </template>
    </van-card>
  </div>
</template>

<script>

export default {
  props: {
    myCardArr: {
      type: Object,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/ .van-card {
  width: 750px;
  height: 240px;
  padding-top: 35px;
}
/deep/ .van-card__title {
  font-size: 32px !important;
  font-weight: 600;
  color: #394043;
  max-height: unset;
  min-height: 50px;
  line-height: 50px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/deep/.van-card__desc {
  font-size: 26px;
  color: #afb2b3;
}

.van-tag {
  background-color: #e1f5f8;
  margin-right: 20px;
  margin-bottom: 10px;
}
.van-card__price-integer {
  color: red;
}
</style>
