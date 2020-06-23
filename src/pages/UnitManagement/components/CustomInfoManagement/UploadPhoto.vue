<template>
  <el-form-item label="图片：">
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      :data="signature"
      list-type="picture-card"
      accept="image/jpeg, image/png"
      :file-list="pictureUrls"
      :limit="6"
      v-bind:before-upload="onBeforeUpload"
      v-bind:on-preview="handlePictureCardPreview"
      v-bind:on-success="handleSuccess"
      v-bind:on-error="handleError"
      v-bind:on-remove="handleRemove"
      v-bind:on-exceed="hahandleExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>

    <p>温馨提示：上传图片格式限制为jpg或png，大小限制为100KB~1MB，上传图片尺寸要求为370×530，最多上传6张；</p>
    <p>保存时请确定每张照片都处于上传完成状态再进行保存操作</p>
  </el-form-item>
</template>

<script>
import mixin from "../Mixins";
export default {
  mixins: [mixin],
  data() {
    return {
      signature: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: "",
        uuid: ""
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },

  computed: {
    pictureUrls: {
      get() {
        return this.UnitManagement.picvideoPath.pictureUrls;
      },
      set() {
        // this.SETOPTIONS({
        //   picvideoPath: {
        //     pictureUrls
        //   }
        // });
      }
    }
  },

  methods: {
    onBeforeUpload(file) {
      const isIMAGE = file.type === "image/jpeg" || "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;
      const isGe100KB = file.size / 1024 > 100;
      const isSize = new Promise(function(resolve, reject) {
        let width = 370;
        let height = 530;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function() {
          let valid = img.width === width && img.height === height;
          valid ? resolve() : reject();
        };
        img.src = _URL.createObjectURL(file);

        // this.host = response.host;
        // _self.dataObj.policy = response.policy;
        // _self.dataObj.signature = response.signature;
        // _self.dataObj.ossaccessKeyId = response.accessid;
        // _self.dataObj.key = response.dir + "_${filename}";
        // _self.dataObj.dir = response.dir;
        // _self.dataObj.host = response.host;
      }).then(
        () => {
          console.log(1);
          return file;
        },
        () => {
          console.log(2);
          this.$message({
            showClose: true,
            message:
              "图片尺寸限制为 370x530，大小不能超过 1MB，且不能小于 100KB！",
            type: "warning",
            duration: 1000
          });
          return Promise.reject();
        }
      );
      if (!isIMAGE) this.$message.warning("上传文件只能是图片格式!");
      if (!isLt1M || !isGe100KB) {
        this.$message.warning(
          "图片尺寸限制为 370x530，大小不能超过 1MB，且不能小于 100KB！"
        );
      }

      return isIMAGE && isLt1M && isGe100KB && isSize;
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleSuccess(response, file, pictureUrls) {
      console.log(response, file, pictureUrls);
      // this.fileList.push({
      //   name: file.name,
      //   url: this.dataObj.host + "/" + this.dataObj.key.replace("${filename}",file.name)
      // });
      this.pictureUrls.push({
        name: file.name,
        url: file.response
      });
    },

    handleError(response, file, pictureUrls) {
      console.log(response, file, pictureUrls);
    },

    handleRemove(file, pictureUrls) {
      console.log(file, pictureUrls);
      var _tmp = this.pictureUrls;
      for (var i = 0, len = _tmp.length; i < len; i++) {
        if ((_tmp[i].name = file.name)) {
          _tmp.splice(i, 1);
          break;
        }
      }
      this.pictureUrls = _tmp;
    },

    hahandleExceed(files, pictureUrls) {
      console.log(files, pictureUrls);
      this.$message({
        showClose: true,
        message: "最多上传6张",
        type: "warning",
        duration: 1000
      });
    }
  }
};
</script>

<style lang="stylus"></style>