<template>
  <div id="content" ref="lottie">
    <!-- <lottie :options="defaultOptions" style="width: 100%; height: 100%;" /> -->
  </div>
</template>

<script>
import lottie from 'lottie-web';
// import lottie from 'vue-lottie';
import dtjson from '../assets/json/lottie';
import dtjson1 from '../assets/json/lottie1';
import dtjson2 from '../assets/json/lottie2';
export default {
  components: {
    // lottie,
  },
  data() {
    return {
      defaultOptions: {
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: dtjson,
      },
      arr: [dtjson, dtjson1, dtjson2],
      num: 0,
    };
  },
  mounted() {
    this.initLottie(); //事实证明了不能再created中去初始化只能在mounted中
  },
  methods: {
    initLottie() {
      let anim = lottie.loadAnimation({
        container: document.getElementById('content'), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: this.arr[this.num % 3],
      });
      this.num++;
      let timer = setTimeout(() => {
        lottie.destroy();
        clearTimeout(timer);
        this.initLottie();
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
#content {
  width: 100%;
  height: 100%;
}
</style>
