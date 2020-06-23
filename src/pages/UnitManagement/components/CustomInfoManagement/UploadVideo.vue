<template>
  <el-form-item label="视频：">
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :limit="1"
      list-type="picture-card"
      accept="video/mp4"
      v-bind:data="{FoldPath:'上传目录', SecretKey:'安全验证'}"
      v-bind:show-file-list="false"
      v-bind:on-progress="uploadVideoProcess"
      v-bind:on-success="handleVideoSuccess"
      v-bind:before-upload="beforeUploadVideo"
      v-bind:on-error="handleError"
      v-bind:on-remove="handleRemove"
      v-bind:on-exceed="hahandleExceed"
    >
      <video
        v-if="videoForm.showVideoPath !='' && !videoFlag"
        v-bind:src="videoForm.showVideoPath"
        class="avatar video-avatar"
        controls="controls"
      >您的浏览器不支持视频播放</video>
      <i
        v-else-if="videoForm.showVideoPath =='' && !videoFlag"
        class="el-icon-plus avatar-uploader-icon"
      ></i>
      <el-progress
        v-if="videoFlag == true"
        type="circle"
        v-bind:percentage="videoUploadPercent"
        style="margin-top:7px;"
      ></el-progress>
    </el-upload>
    <p>https://blog.csdn.net/weixin_43876684/article/details/86556045</p>
  </el-form-item>
</template>

<script>
export default {
  data() {
    return {
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: ""
      },
      videoUrl: [],
      videoCoverUrl: ""
    };
  },
  methods: {
    //上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) == -1
      ) {
        this.$message({
          message: "请上传正确的视频格式",
          type: "warning"
        });
        return false;
      }
      if (!fileSize) {
        this.$message({
          message: "视频大小不能超过50MB",
          type: "warning"
        });
        return false;
      }

      var video = document.querySelector("video");
      video.addEventListener("canplay", function() {
        this.width = this.videoWidth;
        this.height = this.videoHeight;
      });

      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, videoUrl) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;

      //前台上传地址
      //if (file.status == 'success' ) {
      //    this.videoForm.showVideoPath = file.url;
      //} else {
      //     Message.warning("上传失败，请重新上传");
      //}

      //后台上传地址
      if (res.Code == 0) {
        this.videoForm.showVideoPath = res.Data;
      } else {
        this.$message({
          message: res.Message,
          type: "warning"
        });
      }
    },

    handleError(response, file, videoUrl) {
      console.log(response, file, videoUrl);
    },

    handleRemove(file, videoUrl) {
      console.log(file, videoUrl);
      var _tmp = this.videoUrl;
      for (var i = 0, len = _tmp.length; i < len; i++) {
        if ((_tmp[i].name = file.name)) {
          _tmp.splice(i, 1);
          break;
        }
      }
      this.videoUrl = _tmp;
    },

    hahandleExceed(files, videoUrl) {
      console.log(files, videoUrl);
      this.$message({
        showClose: true,
        message: "最多上传1张",
        type: "warning"
      });
    }
  }
};
</script>
