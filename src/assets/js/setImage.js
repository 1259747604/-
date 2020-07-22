import EXIF from 'exif-js';

class ImgInfo {
  constructor(file) {
    this._file = file;
    this.Orientation = null; //图片方向
  }
  // 获取全部信息
  async getAllInfo() {
    let res = await new Promise((reslove,reject)=>{
      EXIF.getData(this._file, function() {
        reslove(EXIF.getAllTags(this));
      });
    }) 
    return res;
  }
  // 获取单个信息
  async getSingleInfo(name) {
    let res = await new Promise((reslove,reject)=>{
      EXIF.getData(this._file, function() {
        reslove(EXIF.getTag(this,name));
      });
    }) 
    return res;
  }
  // 得到图片路径和对象
  /**
   * @param correct是否修正图片
   * @param isBlob是否获取blob路径
   */
  async getImg(correct,isBlob){
    let reader = new FileReader();
    reader.readAsDataURL(this._file);
    let result = {};
    let res = await new Promise((reslove,reject)=>{
      reader.onload = function(result){
        reslove(result.currentTarget.result);
      }
    }).catch(err => '失败')
    result.base64 = res;
    if(isBlob){
      let blob = this.convertBlob(res);
      let url = this.getBlobUrl(blob);
      result.bloburl = url;
    }

    return result
  }
  // 转换为blob
  convertBlob(base64) {
    let str = window.atob(base64.split(",")[1]);
    let arrBur = new ArrayBuffer(str.length);
    let ubuffer = new Uint8Array(arrBur);
    for (let i = 0; i < str.length; i++) {
      ubuffer[i] = str.charCodeAt(i);
    }
    let blob;
    try {
      blob = new Blob([arrBur], { type: "image/jpg" });
    } catch (e) {
      window.BlobBuilder =
        window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MozBlobBuilder ||
        window.MSBlobBuilder;
      if (e.name === "TypeError" && window.BlobBuilder) {
        let blobBuilder = new BlobBuilder();
        blobBuilder.append(arrBur);
        blob = blobBuilder.getBlob("image/jpg");
      }
    }
    return blob;
  }
  // 得到blob链接
  getBlobUrl(blob) {
    let url = window.URL.createObjectURL(blob);
    return url;
  }
  // 修正图片方向
  async correctImg(){
    let res = await this.getSingleInfo('Orientation');
    let width = await this.getSingleInfo('ImageWidth');
    let height = await this.getSingleInfo('ImageHeight');
    // 如果是0则不需要修正
    if(res === 0){
      return this._file;
    }
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    // 如果是90度的旋转则宽高交换
    if(res === 6 || res === 8){
      canvas.width = height;
      canvas.height = width;
    }else {
      canvas.width = width;
      canvas.height = height;
    }

    switch (res) {
      case 6: // 旋转90度
        ctx.rotate(Math.PI / 2);
        break;
      case 3: // 旋转180度
        ctx.rotate(Math.PI);
        break;
      case 8: // 旋转-90度
        ctx.rotate((3 * Math.PI) / 2);
        break;
    }

    return res;
  }
  fileInitInfo() {
    console.log(this._file);
  }
}

export default ImgInfo