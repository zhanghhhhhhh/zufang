<template>
  <div>
    <div class="navBar">
      <i @click="$router.push({ name: 'city' })">
        <span class="area">北京</span>
        <van-icon name="arrow-down" />
      </i>
      <van-icon name="search" />
      <input class="my_ipt" placeholder="请输入搜索关键词" />
      <van-icon name="location-o" @click="$router.push({ name: 'map' })" />
    </div>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in ImgArr" :key="item.id - 1">
        <img v-lazy="`http://liufusong.top:8080${item.imgSrc}`" />
      </van-swipe-item>
    </van-swipe>

    <van-grid :gutter="0">
      <van-grid-item icon="wap-home-o" text="整租" to="/search" />
      <van-grid-item icon="friends-o" text="合租" to="/search" />
      <van-grid-item icon="location-o" text="地图找房" to="/map" />
      <van-grid-item icon="logistics" text="去出租" @click="toRent" />
    </van-grid>

    <div class="bottom">
      <div class="title">
        <i>租房小组</i>
        <span>更多</span>
      </div>
      <!-- <van-row gutter="20">
        <van-col span="12" v-for="(item, index) in GroupArr" :key="index">
          <img :src="item.imgSrc" alt="" />
          <div class="right"></div>
        </van-col>
      </van-row> -->
      <van-grid :column-num="2" :gutter="5" :center="false">
        <van-grid-item v-for="(item, index) in GroupArr" :key="index">
          <div class="total">
            <div class="left">
              <img :src="`http://liufusong.top:8080${item.imgSrc}`" alt="" />
            </div>
            <div class="right">
              <p>{{ item.title }}</p>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getHomeImg, getHomeGroup } from '@/api/home'
// import Search from '@/components/search.vue'
export default {
  created () {
    this.getHomeImgApi()
    this.getHomeGroup()
  },
  data () {
    return {
      ImgArr: [],
      GroupArr: []

    }
  },
  methods: {
    async getHomeImgApi () {
      try {
        const res = await getHomeImg()
        this.ImgArr = res.data.body
        console.log(this.ImgArr)
      } catch (err) {
        console.log(err)
      }
    },
    async getHomeGroup () {
      try {
        const res = await getHomeGroup(this.$store.state.value.value)
        console.log(res)
        this.GroupArr = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    async toRent () {
      if (this.$store.state.user) {
        await this.$router.push({ name: 'houseAdd' })
      } else {
        this.$router.push('login')
      }
    },

    cityFn () {
      this.$router.push({ name: 'city' })
    },
    mapFn () {
      this.$router.push({ name: 'map' })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {

  }
}
</script>

<style scoped lang='less'>
.navBar {
  position: absolute;
  top: 50px;
  left: 35px;
  z-index: 2;
  width: 620px;
  height: 70px;
  padding-left: 30px;
  background-color: #fff;
  border-radius: 10px;
  color: rgb(109, 109, 109);
  i {
    font-style: normal;
  }
  .area {
    font-size: 28px;
  }
  .van-icon-arrow-down {
    position: absolute;
    top: 23px;
    left: 100px;
    font-size: 20px;
  }
  .van-icon-search {
    position: absolute;
    top: 15px;
    left: 150px;
    font-size: 36px;
  }
  .van-icon-location-o {
    position: absolute;
    top: 12px;
    right: -55px;
    color: #fff;
  }
  .my_ipt {
    border: none;
    width: 400px;
    height: 30px;
    padding-left: 50px;
    margin-left: 50px;
    font-size: 28px;
    border-left: 1px solid #eee;
  }
}
.my-swipe .van-swipe-item {
  width: 100%;
  height: 430px;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  img {
    width: 100%;
    height: 430px;
  }
}

.bottom {
  padding: 0 20px 40px 20px;
  background-color: #f6f6f6;
  .title {
    display: flex;
    justify-content: space-between;
    height: 100px;
    align-items: center;
    padding: 0 30px;
    i {
      font-size: 30px;
      font-weight: 700;
      font-style: normal;
    }
    span {
      font-size: 28px;
      font-weight: 400;
      font-weight: 200;
    }
  }

  /deep/.van-grid-item__content {
    color: #21b97a;
    .van-icon {
      font-size: 70px;
    }
    .van-grid-item__text {
      font-size: 28px;
    }

    .total {
      display: flex;
      justify-content: space-evenly;
      .left {
        img {
          width: 100px;
          height: 100px;
        }
      }
      .right {
        padding-top: 15px;
        p {
          font-size: 30px;
          color: #000;
          margin: 0;
        }
      }
    }
  }
}
</style>
