<template>
  <div>
    <van-nav-bar title="房屋管理" left-arrow @click-left="$router.go(-1)" />

    <myCard
      v-for="(item, index) in RentArr"
      :key="index"
      :myCardArr="item"
    ></myCard>
  </div>
</template>

<script>
import myCard from '@/components/my_card.vue'
import { getRent } from '@/api/mymodule'
export default {
  async created () {
    try {
      const res = await getRent()
      console.log(res)
      this.RentArr = res.data.body
    } catch (err) {
      this.$toast.fail('网络不稳定，请重新加载')
    }
  },
  data () {
    return {
      RentArr: []
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
