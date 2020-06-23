<template>
  <!-- 操作者首页 -->
  <el-form>
    <el-form-item>
      <el-button @click="onSubmit">新建</el-button>
      <el-button @click="handleNewly">操作员进入</el-button>
      <el-button @click="handleNewly">查找</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import mixin from "./components/Mixins";
export default {
  mixins: [mixin],
  data() {
    return {};
  },
  methods: {
    onSubmit() {
      console.log(1);
    },

    handleNewly() {
      console.log(2);
    }
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus"></style>



