import EXIF from 'exif-js';

class ImgInfo {
  constructor(file) {
    this._file = file;
  }
  // 获取全部信息
  async getAllInfo() {
    let res = await new Promise((reslove, reject) => {
      EXIF.getData(this._file, function() {
        reslove(EXIF.getAllTags(this));
      });
    });
    return res;
  }
  // 获取单个信息
  async getSingleInfo(name) {
    let res = await new Promise((reslove, reject) => {
      EXIF.getData(this._file, function() {
        reslove(EXIF.getTag(this, name));
      });
    });
    return res;
  }
  // 得到图片路径和对象
  /**
   * @param correct是否修正图片
   * @param isBlob是否获取blob路径
   */
  async getImg(correct, isBlob) {
    let reader = new FileReader();
    // 读取文件转换为base64
    reader.readAsDataURL(this._file);
    let result = {};
    let res = await new Promise((reslove, reject) => {
      reader.onload = function(result) {
        reslove(result.currentTarget.result);
      };
    }).catch((err) => '失败');
    // 如果进行修正
    if (correct) {
      console.log('进入图片修正');
      let resUrl = await this.correctImg(res);
      result.base64 = resUrl;
    } else {
      result.base64 = res;
    }
    if (isBlob) {
      let blob = this.convertBlob(result.base64);
      let url = this.getBlobUrl(blob);
      result.bloburl = url;
    }

    return result;
  }
  // 转换为blob
  convertBlob(base64) {
    let str = window.atob(base64.split(',')[1]);
    let arrBur = new ArrayBuffer(str.length);
    let ubuffer = new Uint8Array(arrBur);
    for (let i = 0; i < str.length; i++) {
      ubuffer[i] = str.charCodeAt(i);
    }
    let blob;
    try {
      blob = new Blob([arrBur], { type: 'image/jpg' });
    } catch (e) {
      window.BlobBuilder =
        window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MozBlobBuilder ||
        window.MSBlobBuilder;
      if (e.name === 'TypeError' && window.BlobBuilder) {
        let blobBuilder = new BlobBuilder();
        blobBuilder.append(arrBur);
        blob = blobBuilder.getBlob('image/jpg');
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
  async correctImg(base64Url) {
    let _this = this;
    let Orientation = await this.getSingleInfo('Orientation');
    console.log('ImgInfo -> correctImg -> Orientation', Orientation);
    let width = await this.getSingleInfo('ImageWidth');
    let height = await this.getSingleInfo('ImageHeight');
    // 如果是0 或者没有这个值 则不需要修正直接返回
    if (Orientation === 0 || !Orientation) {
      return base64Url;
    }
    let img = new Image();
    img.src = window.URL.createObjectURL(this.convertBlob(base64Url));

    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    let url = await new Promise((reslove, reject) => {
      img.onload = function(params) {
        // 如果是90度的旋转则宽高交换
        // if (Orientation === 6 || Orientation === 8) {
        //   canvas.width = height;
        //   canvas.height = width;
        // } else {
        //   canvas.width = width;
        //   canvas.height = height;
        // }
        canvas.width = width;
        canvas.height = height;
        switch (Orientation) {
          case 8: // 旋转90度
            ctx.rotate(0.5 * Math.PI);
            ctx.drawImage(this, 0, -height, width, height);
            break;
          case 3: // 旋转180度
            ctx.rotate(Math.PI);
            ctx.drawImage(this, -width, -height, width, height);
            break;
          case 6: // 旋转-90度
            console.log(222);
            ctx.rotate(-0.5 * Math.PI);
            ctx.drawImage(this, -width, 0, width, height);
            break;
        }
        reslove(canvas.toDataURL('image/jpeg'));
      };
    });

    return url;
  }
}

export default ImgInfo;
