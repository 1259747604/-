<template>
  <div class="container">
    <div class="home">
      <div class="top-info"></div>
      <div class="content">
        <Sticky offset-top="1" @scroll="scroll">
          <div class="search"></div>
        </Sticky>
        <div
          class="list"
          :class="[isOverflow]"
          @scroll="scrollE($event, 'preY', test)"
        >
          <ul>
            <li v-for="(item, index) of 20">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Sticky } from 'vant';
export default {
  components: {
    Sticky,
  },
  data() {
    return {
      isFixed: false,
      preY: [],
    };
  },
  computed: {
    isOverflow() {
      if (this.isFixed) {
        return 'o-auto';
      } else {
        return 'o-hidden';
      }
    },
  },
  mounted() {},
  methods: {
    scroll(val) {
      if (val.isFixed) {
      }
      this.isFixed = val.isFixed;
    },
    test() {
      console.log('test -> flag', 11111);
      this.isFixed = false;
      document.getElementsByClassName('container')[0].scrollTop = 0;
      this.preY = [];
    },
    scrollE(e, initP, callback) {
      if (this[initP].length >= 70) {
        this[initP].splice(0, 50);
      }
      let arr = this[initP];
      if (e.target.scrollTop - arr[arr.length - 1] > 0) {
        console.log('显示下面');
        if (
          e.target.scrollTop + e.target.clientHeight >=
          e.target.scrollHeight
        ) {
          e.target.scrollTop = e.target.scrollHeight - e.target.clientHeight;
        }
        // 存入数组
        this[initP].push(e.target.scrollTop);
      } else {
        e.target.scrollTop = e.target.scrollTop <= 0 ? 0 : e.target.scrollTop;
        // 存入数组
        this[initP].push(e.target.scrollTop);
        console.log('scrollE -> this[initP]', this[initP]);
        let flag = true;
        for (let i = 1; i < 40; i++) {
          if (this[initP][this[initP].length - i] !== 0) {
            flag = false;
          }
        }
        if (flag) {
          callback(flag);
          return;
        }
        console.log('显示上面');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.home {
  height: calc(100% + 120px);
  width: 100%;
  overflow: hidden;
  .top-info {
    width: 100%;
    height: 120px;
    background: linear-gradient(to bottom, #7ab7eb, #72c9d3);
  }
  .content {
    height: calc(100% - 120px);
    .search {
      height: 50px;
      background: #394da6;
    }
    .list {
      height: calc(100% - 50px);
      -webkit-overflow-scrolling: touch;
      &.o-auto {
        overflow: auto;
      }
      &.o-hidden {
        overflow: hidden;
      }
      ul {
        list-style: none;
      }
      li {
        height: 80px;
        border-bottom: 1px solid #30a6a9;
      }
    }
  }
}
</style>
