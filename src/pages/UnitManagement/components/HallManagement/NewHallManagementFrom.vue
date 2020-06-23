<template>
  <div>
    <!-- 告别厅管理 - 新建账号 -->
    <el-form ref="form" :model="dataForm" label-width="150px">
      <el-form-item label="告别厅名称：">
        <el-input v-model="dataForm.name" placeholder="请输入告别厅名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="handleNewly">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mixin from "../Mixins";
import { _editFH } from "@/api/UnitManagement";
import { catchErr } from "@/utils/utils";

export default {
  mixins: [mixin],

  computed: {
    dataForm() {
      return this.UnitManagement.NewHallManagementFromData;
    }
  },

  methods: {
    async onSubmit() {
      let { id = null, name } = this.dataForm;
      let [err, res] = await catchErr(
        _editFH({
          data: {
            id,
            name
          }
        })
      );
      if (err) {
        console.log(err);
        this.$message.error(err || "错了哦，系统异常");
      } else if (res) {
        console.log(res);
        this.$message.success("操作成功");
        this.$destroy(true);
      }
    },

    handleNewly() {
      this.$destroy(true);
    }
  },

  beforeDestroy() {
    this.SETOPTIONS({
      indexHallManagement: 0,
      NewHallManagementFromData: {}
    });
  }
};
</script>

<style lang="stylus"></style>