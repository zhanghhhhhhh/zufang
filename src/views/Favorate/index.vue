<template>
  <div>
    <van-nav-bar title="收藏列表" left-arrow @click-left="$router.go(-1)" />
    <myCard
      v-for="(item, index) in CollectArr"
      :key="index"
      :myCardArr="item"
    ></myCard>
  </div>
</template>

<script>
import myCard from '@/components/my_card.vue'
import { getCollect } from '@/api/mymodule'
export default {
  async created () {
    try {
      const res = await getCollect()
      this.CollectArr = res.data.body
      console.log(res)
    } catch (err) {
      console.log(err)
      this.$toast.fail('网络不稳定，请重新加载')
    }
  },
  data () {
    return {
      CollectArr: []
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {
    myCard
  }
}
</script>

<style scoped lang='less'>
</style>
