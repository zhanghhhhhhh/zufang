<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="value"
        show-action
        placeholder="请输入小区或地址"
        @search="onSearch"
        @cancel="$router.back()"
      />
    </form>
    <van-cell-group inset>
      <van-cell
        v-for="(item, index) in isResult"
        :key="index"
        :title="item.communityName"
        @click="onSearchResult(item.communityName)"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getHomeKeyword } from '@/api/sent'
export default {
  created () { },
  data () {
    return {
      value: '',
      isResult: []
    }
  },
  methods: {
    async onSearch (val) {
      try {
        if (this.value === '') {
          this.$toast.fail('请输入内容')
          return
        } else {
          const res = await getHomeKeyword(val, this.$store.state.value.value)
          console.log(res)
          this.isResult = res.data.body
        }
      } catch (err) {
        console.log(err)
      }
    },
    onSearchResult (val) {
      this.$store.commit('setKeyword', val)
      this.$router.push('add')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
