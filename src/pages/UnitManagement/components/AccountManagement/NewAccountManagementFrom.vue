<template>
  <div>
    <!-- 账号管理 - 新建账号 -->
    <el-form ref="form" :model="dataForm" label-width="150px">
      <el-form-item label="角色：">
        <span v-if="dataForm.id">{{dataForm.role.name}}</span>
        <el-radio-group v-else v-model="dataForm.role.id">
          <el-radio :label="1">操作者</el-radio>
          <el-radio :label="2">审核者</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="登录账号：">
        <el-input v-model="dataForm.name" :disabled="isdisabledName"></el-input>
      </el-form-item>

      <el-form-item label="登录密码：">
        <el-input v-model="resetPwd" disabled></el-input>
        <el-checkbox-group v-model="checkboxGroup" v-if="dataForm.id">
          <el-checkbox-button label="重置">重置</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="使用者：">
        <el-input v-model="dataForm.nick" placeholder="请输入使用者姓名"></el-input>
      </el-form-item>

      <el-form-item label="手机号：">
        <el-input v-model="dataForm.tel" placeholder="请输入使用者手机号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="handleNewly">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mixin from "../Mixins";
import { _editAdmin } from "@/api/UnitManagement";
import { catchErr } from "@/utils/utils";

export default {
  mixins: [mixin],
  data() {
    return {
      resetPwd: 123456,
      checkboxGroup: []
    };
  },

  computed: {
    dataForm() {
      return this.UnitManagement.NewAccountManagementFromData;
    },
    isdisabledName() {
      return typeof this.dataForm.id === "number" && this.dataForm.id > 0
        ? true
        : false;
    }
  },

  methods: {
    async onSubmit() {
      let roleId = this.dataForm.role.id;
      let { id = null, name, nick, tel } = this.dataForm;
      let resetPwd = this.checkboxGroup.length ? true : false;
      let [err, res] = await catchErr(
        _editAdmin({
          data: {
            roleId,
            id,
            name,
            nick,
            resetPwd,
            tel
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
      indexAccountManagement: 0,
      NewAccountManagementFromData: {}
    });
    this.checkboxGroup = [];
  }
};
</script>

<style lang="stylus"></style>