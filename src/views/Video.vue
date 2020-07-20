<template>
  <div class="content">
    <video
      id="videoElement"
      style="width: 80%;"
      controls="controls"
      autoplay="autoplay"
    ></video>
  </div>
</template>

<script>
import flvjs from 'flv.js';
export default {
  data() {
    return {};
  },
  mounted() {
    this.initFlv();
  },
  methods: {
    initFlv() {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: 'http://192.168.124.5:8200/live/tt.flv',
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
