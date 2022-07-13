<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="账号登录">
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.back()" />
      </template>
    </van-nav-bar>

    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model.trim="username"
        name="username"
        placeholder="请输入账号"
      />
      <van-field
        v-model.trim="password"
        type="password"
        name="password"
        placeholder="请输入密码"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
      <p class="msg">还没有账号，去注册~</p>
    </van-form>
  </div>
</template>

<script>
import { getLogin } from '@/api/login'
export default {
  name: 'login',
  created () {
    console.log(this.$store.state.user)
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await getLogin(values)
        console.log(res)
        if (res.data.body) {
          this.$store.commit('setUser', res.data.body.token)
          this.$router.push({ name: 'my' })
          this.$toast.success(res.data.description)
        } else {
          this.$toast.fail(res.data.description)
        }

        // if (res.data.state === 200) {
        //   this.$store.commit('setUser', res.data.body.token)
        //   this.$router.push({ name: 'my' })
        //   this.$toast.success(res.data.description)
        //   this.$toast.success(res.data.description)
        // } else if (res.data.state === 400) {
        //   this.$toast.fail('请输入账号密码')
        // } else {
        //   this.$toast.fail('账号密码错误错误')
        // }
      } catch (err) {
        console.log(err)
      }
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/.van-cell__value {
  width: 690px;
  height: 110px;
  font-size: 34px;
  padding: 4px 0;
  .van-field__control {
    line-height: 120px;
  }
}
.van-button {
  background-color: #21b97a;
  border: 1px solid #21b97a;
  width: 690px;
  height: 100px;
  .van-button__text {
    font-size: 36px;
  }
}
.msg {
  width: 100%;
  text-align: center;
  margin-top: 60px;
  font-size: 26px;
  color: rgb(182, 182, 182);
}
</style>
