<template>
  <div>
    <baidu-map class="map" center="北京"></baidu-map>
  </div>
</template>

<script>
// import Map from '@/api/BaiDuMap/loadMap'
import BMapGL from '@/api/BaiDuMap/bmpgl'
export default {
  created () {
    const map = new BMapGL.Map('container')
    map.centerAndZoom(new BMapGL.Point(116.404, 39.928), 15)
    map.enableScrollWheelZoom(true)
    // 创建点标记
    const marker1 = new BMapGL.Marker(new BMapGL.Point(116.404, 39.925))
    const marker2 = new BMapGL.Marker(new BMapGL.Point(116.404, 39.915))
    const marker3 = new BMapGL.Marker(new BMapGL.Point(116.395, 39.935))
    const marker4 = new BMapGL.Marker(new BMapGL.Point(116.415, 39.931))
    // 在地图上添加点标记
    map.addOverlay(marker1)
    map.addOverlay(marker2)
    map.addOverlay(marker3)
    map.addOverlay(marker4)
  },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.map {
  width: 100%;
  height: 100vh;
}
</style>
