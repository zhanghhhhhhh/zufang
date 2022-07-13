<template>
  <div class="my">
    <div class="my_img1"></div>
    <div class="person">
      <img src="@/assets/avatar.png" />
      <div v-if="isLogin">
        <p>好客_46423</p>
        <van-button round type="primary" size="mini" @click="logoutFn"
          >退出</van-button
        >
      </div>
      <div v-else>
        <p>游客</p>
        <van-button type="primary" size="mini" to="/login">去登录</van-button>
      </div>
    </div>
    <div class="my_grid">
      <van-grid :column-num="3" clickable>
        <van-grid-item icon="star-o" text="我的收藏" @click="isFavorateShow" />
        <van-grid-item icon="wap-home-o" text="我的出租" @click="isRentShow" />
        <van-grid-item icon="clock-o" text="看房记录" />
        <van-grid-item icon="debit-pay" text="成为房主" />
        <van-grid-item icon="contact" text="个人资料" />
        <van-grid-item icon="service-o" text="联系我们" />
      </van-grid>
    </div>
    <div class="my_img2"></div>
  </div>
</template>

<script>
import { getUser } from '@/api/login'
export default {
  created () {
    this.getUser()
  },
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    async getUser () {
      try {
        if (this.$store.state.user) {
          this.isLogin = true
          await getUser(this.$store.state.user)
        } else {
          this.isLogin = false
        }
      } catch (err) {
        console.log(err)
      }
    },
    logoutFn () {
      this.$store.commit('setUser', '')
      this.$dialog.confirm({
        title: '提示',
        message: '是否确定退出?'
      })
        .then(() => {
          this.$router.push('login')
        }).catch(() => {
          // on cancel
        })
    },

    // 判断是否为登陆状态而跳转
    isFavorateShow () {
      if (this.$store.state.user) {
        this.$router.push('favorate')
      } else {
        this.$router.push('login')
      }
    },
    isRentShow () {
      if (this.$store.state.user) {
        this.$router.push('rent')
      } else {
        this.$router.push('login')
      }
    }
  },
  computed: {

  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.my {
  .my_img1 {
    width: 100%;
    height: 380px;

    background: url("@/assets/bg.png") no-repeat 0 / contain;
  }
  .person {
    position: relative;
    top: -150px;
    left: 55px;
    width: 640px;
    height: 330px;
    text-align: center;
    // border: 1px solid #ccc;
    box-shadow: 2px 2px 10px 4px #ccc;
    background-color: #fff;
    img {
      position: absolute;
      top: -60px;
      left: 260px;
      width: 120px;
      height: 120px;
    }

    p {
      font-size: 28px;
      padding-top: 90px;
    }
    .van-button {
      width: 140px;
      height: 60px;
    }
  }
  .my_grid {
    position: absolute;
    top: 48%;
  }
  .my_img2 {
    position: absolute;
    left: 40px;
    bottom: 150px;
    text-align: center;
    width: 670px;
    height: 170px;
    // background-image: url("@/assets/join.png");
    // background-repeat: no-repeat;
    // background-size: contain;
    background: url("@/assets/join.png") no-repeat 0 / contain;
  }
}
</style>
