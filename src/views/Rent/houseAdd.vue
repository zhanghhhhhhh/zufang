<template>
  <div class="main">
    <van-nav-bar title="发布房源" left-arrow @click-left="backBtn" />
    <ul>
      <li>
        <div class="title bottom">房源信息</div>
        <div class="info">
          <van-cell
            title="小区名称"
            :value="!isAreaShow ? '请输入小区名称' : $store.state.keyword"
            to="/rentsearch"
          />
          <van-icon name="arrow" />
        </div>
        <!-- -->
        <!-- 租房 -->
        <van-cell-group>
          <van-field v-model="value3" label="租房" placeholder="请输入租金/月">
            <template #extra>¥/月 </template>
          </van-field>
        </van-cell-group>

        <!-- 建筑面积 -->
        <van-cell-group>
          <van-field
            v-model="value4"
            label="建筑面积"
            placeholder="请输入建筑面积"
          >
            <template #extra>m²</template>
          </van-field>
        </van-cell-group>

        <!-- 户型 -->
        <div class="info">
          <van-field
            readonly
            clickable
            name="picker"
            :value="value"
            label="户型"
            placeholder="请选择"
            @click="showPicker = true"
          />

          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-icon name="arrow" />
        </div>
        <!-- 所在楼层 -->
        <div class="info">
          <van-field
            readonly
            clickable
            name="picker"
            :value="value1"
            label="所在楼层"
            placeholder="请选择"
            @click="showPicker1 = true"
          />
          <van-popup v-model="showPicker1" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns1"
              @confirm="onConfirm1"
              @cancel="showPicker1 = false"
            />
          </van-popup>
          <van-icon name="arrow" />
        </div>

        <!-- 朝向 -->
        <div class="info">
          <van-field
            readonly
            clickable
            name="picker"
            :value="value2"
            label="朝向"
            placeholder="请选择"
            @click="showPicker2 = true"
          />

          <van-popup v-model="showPicker2" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns2"
              @confirm="onConfirm2"
              @cancel="showPicker2 = false"
            />
          </van-popup>
          <van-icon name="arrow" />
        </div>
      </li>
      <li>
        <div class="bottom">房屋标题</div>
        <van-field
          v-model="message"
          autosize
          type="textarea"
          placeholder="请输入标题(例如：整租 小区名 2室 5000元)"
        />
      </li>
      <li>
        <div class="bottom">房屋图像</div>
        <van-uploader v-model="fileList" :after-read="afterRead" multiple>
          <template #default>
            <van-icon name="plus" />
          </template>
        </van-uploader>
      </li>
      <li>
        <div class="bottom">房屋配置</div>
        <van-grid square :column-num="5" clickable>
          <van-grid-item
            v-for="(item, index) in columns3"
            :key="index"
            border="false"
            @click="supporting(index)"
          >
            <template #icon>
              <div ref="color">
                <i :class="`iconfont ${iconArr[index]}`"></i>
                <p>{{ item }}</p>
              </div>
            </template></van-grid-item
          >
        </van-grid>
      </li>
      <li>
        <div class="bottom">房屋描述</div>
        <van-field
          autosize
          v-model="message1"
          type="textarea"
          placeholder="请输入房屋描述信息"
          show-word-limit
        />
      </li>
    </ul>

    <van-button plain type="primary" @click="cancel">取消</van-button>
    <van-button type="primary">确定</van-button>
  </div>
</template>

<script>
import { getHomeInfo } from '@/api/sent'
export default {
  async created () {
    const { data } = await getHomeInfo()
    this.InfoArr = data.body
    this.InfoArr.roomType.forEach(item => {
      this.columns.push(item.label)
    })
    this.InfoArr.floor.forEach(item => {
      this.columns1.push(item.label)
    })

    this.InfoArr.oriented.forEach(item => {
      this.columns2.push(item.label)
    })
    this.InfoArr.supporting.forEach(item => {
      this.columns3.push(item.label)
    })

    console.log(this.InfoArr)

    if (this.$store.state.keyword === '') {
      this.isAreaShow = false
    } else {
      this.isAreaShow = true
    }
  },
  data () {
    return {
      value: '', // 户型
      columns: [],
      showPicker: false,
      value1: '', // 所在楼层
      columns1: [],
      showPicker1: false,
      value2: '', // 朝向
      columns2: [],
      showPicker2: false,
      InfoArr: {},
      columns3: [],
      value3: '', // 租房和建筑面积
      value4: '',
      message: '', // 房屋描述
      message1: '',
      iconArr: ['icon-dianshi', 'icon-bingxiang', 'icon-xiyiji', 'icon-kongdiao', 'icon-haofangtuo400iconfont2reshuiqi', 'icon-jiajiabaojie-tubiao-', 'icon-shuinuanqigongcheng', 'icon-icon-test', 'icon-yigui-hui', 'icon-tianranqi-01'],
      fileList: [], // 图片
      flag: false, // 控制配置高亮
      isAreaShow: ''
    }
  },
  methods: {
    // 选择器的点击事件
    onConfirm (value) {
      this.value = value
      this.showPicker = false
    },
    onConfirm1 (value) {
      this.value1 = value
      this.showPicker1 = false
    },
    onConfirm2 (value) {
      this.value2 = value
      this.showPicker2 = false
    },
    supporting (id) {
      this.flag = !this.flag

      const divArr = this.$refs.color
      console.log(divArr)
      console.log(divArr[id])
      divArr[id].style = this.flag ? 'color: #21b97a' : ''
    },
    afterRead (file) {
      console.log(file)
    },
    backBtn () {
      this.$router.go(-1)
      this.$store.commit('setKeyword', '')
    },
    cancel () {
      this.$dialog.confirm({
        title: '提示',
        message: '放弃发布房源',
        cancelButtonText: '放弃',
        confirmButtonText: '继续编辑'
      })
        .then(() => {
          // on confirm

        })
        .catch(() => {
          // on cancel
          this.$router.push('home')
        })
    }

  },
  computed: {},
  watch: {},
  filters: {}
}
</script>

<style scoped lang='less'>
.main {
  background-color: #f5f5f9;
  ul {
    background-color: #fff;
    font-size: 28px;

    li {
      padding: 30px 30px 20px;
      &:first-child > .title {
        color: #21b97a;
      }
      &:last-child {
        height: 250px;
        margin-bottom: 80px;
      }

      .bottom {
        border-bottom: 1px solid #c7c7cc;
        padding-bottom: 10px;
        margin-bottom: 30px;
      }
      .van-cell__value {
        color: #c7c7cc;
      }
      .info {
        position: relative;
        .van-icon-arrow {
          position: absolute;
          top: 26px;
          right: 0;
          color: #c7c7cc;
          z-index: 99;
        }
        /deep/.van-field__control {
          padding-left: 340px;
        }
      }
      /deep/.van-uploader__input-wrapper {
        width: 165px;
        height: 165px;
        border: 1px solid #c7c7cc;
        text-align: center;
        line-height: 165px;
        .van-icon {
          color: #c7c7cc;
          font-size: 40px;
        }
      }

      /deep/.van-grid-item__content {
        border: 0px solid #fff;
      }
      /deep/.iconfont {
        font-size: 46px;
      }
      /deep/.van-grid-item__text {
        margin-top: 10px;
      }
    }
  }
  .van-button {
    height: 100px;
    width: 50%;
    font-size: 40px;
    border: 1px solid #ccc;
  }
}
/deep/.van-uploader__upload {
  margin-top: 20px;
}
.hightColor {
  color: #21b97a;
}
</style>
