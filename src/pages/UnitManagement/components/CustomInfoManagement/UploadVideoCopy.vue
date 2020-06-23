<template>
  <el-form-item label="视频：">
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      v-bind:data="{FoldPath:'上传目录',SecretKey:'安全验证'}"
      :show-file-list="false"
      v-bind:before-upload="beforeUploadVideo"
      v-bind:on-progress="uploadVideoProcess"
      v-bind:on-success="handleVideoSuccess"
    >
      <video
        v-if="videoForm.showVideoPath !='' && !videoFlag"
        :src="videoForm.showVideoPath"
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
        @percentage="videoUploadPercent"
        style="margin-top:7px;"
      ></el-progress>
    </el-upload>

    <p>
      温馨提示：上传图片格式限制为jpg或png，大小限制为100KB~1MB，尺寸要求为640×480；
      上传视频格式限制为mp4，大小限制为10~40MB，尺寸要求为640×480；
    </p>
    <p>保存时请确定照片和视频都处于上传完成状态再进行保存操作；</p>
  </el-form-item>
</template>

<script>
import { Message } from "element-ui";
import mixin from "../Mixins";
export default {
  mixins: [mixin],
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
      }
    };
  },
  methods: {
    // VideoUpload Start
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
        Message({
          showClose: true,
          message: "请上传正确的视频格式",
          type: "warning",
          duration: 1000
        });
        return false;
      }
      if (!fileSize) {
        Message({
          showClose: true,
          message: "视频大小不能超过50MB",
          type: "warning",
          duration: 1000
        });
        return false;
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      console.log(res, file);
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;

      //前台上传地址
      if (file.status == "success") {
        this.videoForm.showVideoPath = file.url;
      } else {
        layer.msg("上传失败，请重新上传");
      }

      //后台上传地址
      if (res.Code == 0) {
        this.videoForm.showVideoPath = res.Data;
      } else {
        Message({
          showClose: true,
          message: res.Message,
          type: "warning",
          duration: 1000
        });
      }
    }

    // VideoUpload End
  }
};
</script>

<style lang="stylus"></style>