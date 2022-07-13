<template>
  <div>
    <van-nav-bar
      :title="articleInfoArr.community"
      left-arrow
      @click-left="$router.go(-1)"
      fixed
    />
    <div class="box"></div>
    <div class="contain">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in imageSwipe" :key="index">
          <img v-lazy="`http://liufusong.top:8080${item}`" />
        </van-swipe-item>
      </van-swipe>
      <div class="title">{{ articleInfoArr.title }}</div>
      <van-tag
        text-color="#39becd"
        v-for="(obj, index) in articleInfoArr.tags"
        :key="index"
      >
        {{ obj }}
      </van-tag>
      <van-row>
        <van-col span="8">
          <div class="Info">
            {{ articleInfoArr.price }}
            <span>/月</span>
          </div>
          <div>租金</div>
        </van-col>
        <van-col span="8">
          <div class="Info">{{ articleInfoArr.roomType }}</div>
          <div>房型</div>
        </van-col>
        <van-col span="8">
          <div class="Info">
            {{ articleInfoArr.size }}
            <span>平米</span>
          </div>
          <div>面积</div>
        </van-col>
      </van-row>

      <van-grid square :column-num="5" clickable>
        <van-grid-item
          v-for="(item, index) in articleInfoArr.supporting"
          :key="index"
          :text="item"
          border="false"
        >
        </van-grid-item>
      </van-grid>

      <div class="liskShow">
        <p>猜你喜欢</p>
        <MyCard :myCardArr="myCardArr"></MyCard>
      </div>
    </div>
    <van-tabbar fixed>
      <van-tabbar-item @click="isCollect">
        <van-icon name="star-o" v-if="!this.isLike" />
        <van-icon name="star collect" v-else />

        收藏</van-tabbar-item
      >
      <van-tabbar-item>在线咨询</van-tabbar-item>
      <van-tabbar-item>电话预约</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import MyCard from '@/components/my_card.vue'
import { articleFavorite, articleIsFavorite, articleDelFavorite, articleInfo } from '@/api/articleInfo'
import { getHomeAll } from '@/api/home'
import _ from 'lodash'
export default {
  async created () {
    const res = await articleInfo(this.$route.params.article_id)
    console.log(res)
    this.articleInfoArr = res.data.body
    this.imageSwipe = res.data.body.houseImg
    console.log(this.imageSwipe)

    const res1 = await articleFavorite(this.$route.params.article_id)
    this.isLike = res1.data.body.isFavorite
    console.log(res1)
    console.log(this.isLike)

    const res2 = await getHomeAll(this.$store.state.value.value)
    // console.log(res)
    this.myCardArr = res2.data.body.list
    this.myCardArr = _.chunk(res2.data.body.list, 3)[0]
    console.log(this.myCardArr)
  },
  data () {
    return {
      articleInfoArr: {},
      imageSwipe: [],
      myCardArr: [],
      isLike: ''// 房屋默认未收藏
    }
  },
  methods: {
    async isCollect () {
      if (!this.isLike) {
        const res = await articleIsFavorite(this.$route.params.article_id)
        console.log(res)
        this.$toast.success(res.data.description)
        this.isLike = !this.isLike
      } else {
        const res = await articleDelFavorite(this.$route.params.article_id)
        console.log(res)
        this.$toast.fail(res.data.description)
        this.isLike = !this.isLike
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {

    MyCard
  }
}
</script>

<style scoped lang='less'>
.contain {
  // background-color: #f6f5f6;
  margin: 80px 0;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.van-swipe-item {
  width: 100%;
  height: 400px;
  img {
    width: 100%;
    height: 100%;
  }
}
.title {
  margin: 40px 0 10px 20px;
}
.van-tag {
  background-color: #e1f5f8;
  margin-right: 20px;
  margin-bottom: 10px;
}

.Info {
  color: #fa5741;
  font-size: 36px;
  font-weight: bolder;
}
.van-row {
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
  margin: 30px 0;
  padding: 30px 0;
  .van-col {
    text-align: center;
  }
}

.liskShow {
  p {
    padding: 30px 20px;
    font-size: 30px;
    border-bottom: 1px solid #e7e7e7;
  }
}
.van-tabbar-item {
  border: 1px solid #cecece;
  font-size: 34px;
  color: #999;
  &:last-child {
    background-color: #21b97a;
    color: #fff;
  }
}
.liskShow {
  border-top: 50px solid #f6f5f6;
  padding: 20px;
}
.van-card {
  background-color: #fff;
}
.collect {
  color: #ff4f00;
}
</style>
