<template>
  <div>
    <Uploader :after-read="afterRead" />
    <img :src="bloburl" alt="">
  </div>
</template>

<script>
import setImage from '../assets/js/setImage';
import { Uploader } from 'vant';
export default {
  components: {
    Uploader
  },
  data() {
    return {
      bloburl:''
    }
  },
  methods: {
    afterRead(file) {
      this.setInfo(file.file);
    },
    async setInfo(file){
      let info = new setImage(file);
      let allInfo = await info.getAllInfo();
      let res = await info.getImg(true,true);
      this.bloburl = res.bloburl;
      console.log("setInfo -> orientation", orientation)
    }
  }
}
</script>

