<template>
  <div>
    <baidu-map
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="19"
      @ready="ready"
    >
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <bm-marker
        :position="{ lng: 116.404, lat: 39.915 }"
        :dragging="true"
        @click="infoWindowOpen"
      >
      </bm-marker>
      <bm-overlay v-show="show" pane="labelPane" @draw="draw" class="sample">
        <div class="test">111</div>
      </bm-overlay>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  methods: {
    ready({ BMap, map }) {
      console.log('ready -> BMap', BMap);
      console.log('ready -> map', map);
      // map.disablePinchToZoom();
      // map.disableAutoResize();
    },
    infoWindowOpen() {
      this.show = !this.show;
    },
    draw({ el, map, BMap }) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915));
      el.style.left = `${pixel.x - el.offsetWidth / 2}px`;
      el.style.top = `${pixel.y - el.offsetHeight - 30}px`;
      // el.style.transform = 'translate(6%, 57%)';
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 100%;
}
.map {
  width: 100%;
  height: 100%;
}
.sample {
  position: absolute;
  width: 343px;
  height: 184px;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 5px #000;
  color: #fff;
}
.test {
  // width: 100px;
  // height: 100px;
  // background: red;
}
</style>
