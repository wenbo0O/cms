<template>
  <div>
    <!-- 新建账号 -->
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="标题：">
        <el-input v-model="form.name" placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-form-item label="内容：">
        <el-input v-model="form.content" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
      </el-form-item>

      <!-- 上传图片 -->
      <upload-photo></upload-photo>

      <!-- 上传视频 -->
      <upload-video></upload-video>

      <el-form-item>
        <el-button @click="onSubmit" type="primary">确定</el-button>
        <el-button @click="handleNewly">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mixin from "../Mixins";
import { _findCustomById, _editCustom } from "@/api/UnitManagement";
import { catchErr } from "@/utils/utils";

export default {
  mixins: [mixin],
  data() {
    return {
      form: {
        name: "",
        content: ""
      }
    };
  },

  computed: {
    customId() {
      return this.UnitManagement.customId;
    }
  },

  methods: {
    async findCustomById() {
      let [err, res] = await catchErr(
        _findCustomById({
          data: this.customId
        })
      );
      if (err) {
        console.log(err);
        this.$message.error(err || "错了哦，系统异常");
      } else if (res) {
        let {
          id,
          name,
          content,
          pictureUrls = [],
          videoUrl = "",
          videoCoverUrl = ""
        } = res.data;
        this.form = {
          id,
          name,
          content
        };

        this.SETOPTIONS({
          picvideoPath: {
            pictureUrls,
            videoUrl,
            videoCoverUrl
          }
        });
      }
    },

    async onSubmit() {
      let [err, res] = await catchErr(
        _editCustom({
          customId: this.customId,
          ...this.form
        })
      );
      if (err) {
        console.log(err);
        this.$message.error(err || "错了哦，系统异常");
      } else if (res) {
        console.log(res);
      }
    },

    handleNewly() {
      this.$destroy(true);
    }
  },

  created() {
    if (this.customId) this.findCustomById();
  },

  beforeDestroy() {
    this.SETOPTIONS({
      indexCustomInfoManagement: 0,
      customId: ""
    });
  }
};
</script>

<style lang="stylus"></style>