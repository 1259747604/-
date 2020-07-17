<template>
  <div class="home">
    <div class="top-info"></div>
    <div class="content">
      <Sticky offset-top="1" @scroll="scroll">
        <div class="search"></div>
      </Sticky>
      <div class="list" :class="[isOverflow]">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
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
  methods: {
    scroll(val) {
      this.isFixed = val.isFixed;
    },
  },
};
</script>

<style lang="scss" scoped>
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
    .search {
      height: 50px;
      background: #394da6;
    }
    height: calc(100% - 120px);
    .list {
      height: calc(100% - 50px);
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
