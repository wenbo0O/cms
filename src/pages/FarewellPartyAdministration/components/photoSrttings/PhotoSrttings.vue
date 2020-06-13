<template>
  <div>
    <!-- 照片管理 -->
    <el-upload
      action="#"
      list-type="picture-card"
      :limit="6"
      :auto-upload="false"
      accept="image/jpeg, image/png"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <!-- <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
            <i class="el-icon-download"></i>
          </span>-->
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
        <p>xxxxxx</p>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>

    <!-- <el-row :gutter="30" class="TemplateSettingsText-list">
      <el-col :span="8">
        <div class="grid-content">
          <img src="@/assets/images/imgcode.png" alt="imgcode" />
          <p>xxxxxx</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <img src="@/assets/images/imgcode.png" alt="imgcode" />
          <p>xxxxxxxxx</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <img src="@/assets/images/imgcode.png" alt="imgcode" />
          <p>xxxxxxxxx</p>
        </div>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        region: ""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  }
};
</script>

<style lang="stylus" scoped>
.TemplateSettingsText-list {
  .grid-content {
    text-align: center;
    width: 300px;
    height: 300px;

    img {
      width: 100%;
      height: 100%;
    }

    p {
      line-height: 50px;
    }
  }
}
</style>

