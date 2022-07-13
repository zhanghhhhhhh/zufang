
<template>
  <div>
    <!-- 导航栏 -->
    <div class="headers">
      <div class="navBar">
        <van-icon
          name="arrow-left"
          class="left_icon"
          @click="$router.push('home')"
        />
        <i @click="$router.push({ name: 'city' })">
          <span class="area">{{ this.$store.state.value.label }}</span>
          <van-icon name="arrow-down" />
        </i>
        <van-icon name="search" />
        <input class="my_ipt" placeholder="请输入小区或地址" />
        <van-icon name="location-o" @click="$router.push({ name: 'map' })" />
      </div>
    </div>

    <!-- 选择区域 -->
    <div class="body">
      <van-dropdown-menu>
        <van-dropdown-item title="区域">
          <template #default>
            <van-picker :columns="column0" />
            <van-button plain type="primary">取消</van-button>
            <van-button type="primary">确定</van-button>
          </template>
        </van-dropdown-item>

        <van-dropdown-item title="方式">
          <template #default>
            <van-picker>
              <template #option> </template>
            </van-picker>
            <van-button plain type="primary">取消</van-button>
            <van-button type="primary">确定</van-button>
          </template>
        </van-dropdown-item>
        <van-dropdown-item title="租金">
          <template #default>
            <van-picker :columns="column2"> </van-picker>
            <van-button plain type="primary">取消</van-button>
            <van-button type="primary">确定</van-button>
          </template>
        </van-dropdown-item>
        <van-dropdown-item title="筛选">
          <template #option>
            <van-popup
              v-model="show"
              position="right"
              :style="{ height: '50%' }"
            />
          </template>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>

    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <template #default>
          <!-- <myCard :myCardArr="HomeAll"></myCard> -->
          <myCard
            v-for="(item, index) in HomeAll"
            :key="index"
            :myCardArr="item"
          ></myCard>
        </template>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getHomeAll, getHomeCondition } from '@/api/home'
import myCard from '@/components/my_card.vue'
export default {
  name: 'MySearch',
  created () {
    this.OnSendFn()
    this.getHomeCondition()
  },
  data () {
    return {
      articleList: [],
      HomeAll: [],
      ConditionArr: [],
      houseCode: [], // 房源信息的id
      column0: [
        {
          text: '区域',
          children: [
            {
              text: '不限',
              children: [{ text: '' }, { text: '' }]
            },
            {
              text: '白云',
              children: [{ text: '不限' }, { text: '金沙洲' }]
            }
          ]
        },
        {
          text: '地铁',
          children: [
            {
              text: '不限',
              children: [{ text: '' }, { text: '' }]
            },
            {
              text: '5号线',
              children: [{ text: '不限' }, { text: '西场' }]
            }
          ]
        }
      ],
      column1: ['不限', '整租', '合租'],
      column2: ['不限', '1000以下', '1000-2000', '2000-3000', '3000-4000'],

      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async OnSendFn () {
      try {
        const res = await getHomeAll(this.$store.state.value.value)
        console.log(res)
        // this.articleList = res.data.body.list
        console.log(this.HomeAll)
        if (this.HomeAll === null) {
          this.finished = true
        }
        this.HomeAll.push(...res.data.body.list)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },

    async getHomeCondition () {
      try {
        const res = await getHomeCondition(this.$store.state.value.value)
        console.log(res)
        // this.ConditionArr = res.data.body
        // console.log(this.ConditionArr)
      } catch (err) {
        console.log(err)
      }
    },

    onLoad () {
      this.OnSendFn()
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    myCard
  }
}
</script>

<style scoped lang='less'>
.headers {
  height: 100px;
  background-color: #21b97a;
  text-align: center;
  .navBar {
    position: relative;
    top: 16px;
    left: 90px;
    z-index: 2;
    width: 550px;
    height: 70px;
    padding-left: 30px;
    background-color: #fff;
    border-radius: 10px;
    color: rgb(109, 109, 109);
    .left_icon {
      position: absolute;
      left: -70px;
      top: 10px;
      color: #fff;
    }
    i {
      position: absolute;
      top: 2px;
      left: 15px;
      font-style: normal;
    }
    .area {
      font-size: 34px;
    }
    .van-icon-arrow-down {
      position: absolute;
      top: 23px;
      left: 70px;
      font-size: 20px;
    }
    .van-icon-search {
      position: absolute;
      top: 18px;
      left: 160px;
      font-size: 40px;
    }
    .van-icon-location-o {
      position: absolute;
      top: 12px;
      left: 560px;
      width: 100px;
      color: rgb(255, 255, 255);
    }
    .my_ipt {
      border: none;
      width: 300px;
      height: 30px;
      margin-top: 20px;
      padding-left: 70px;
      margin-left: 30px;
      font-size: 30px;
      input::placeholder {
        color: #a5a5a5;
      }
      border-left: 1px solid #999;
    }
  }
}

.body {
  .van-button {
    height: 100px;
    width: 50%;
    font-size: 40px;
    border: 1px solid #ccc;
  }
  .van-dropdown-menu__bar {
    position: fixed;
    top: 0;
  }
}
</style>
