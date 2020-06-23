<template>
  <div class="LeftnavMenu">
    <el-checkbox v-model="isCollapse" />
    <el-menu
      router
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-menu-item index="/FarewellPartyAdministration" :disabled="isDisabledParty">
        <i class="el-icon-menu"></i>
        <span slot="title">告别会管理</span>
      </el-menu-item>

      <el-menu-item index="/Unit" :disabled="isDisabledUnit">
        <i class="el-icon-document"></i>
        <span slot="title">单位管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "LeftnavMenu",
  data() {
    return {
      isCollapse: true,
      isDisabledParty: false,
      isDisabledUnit: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>.

<style lang="stylus">
.LeftnavMenu {
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-menu--collapse {
    width: 100px;
  }
}
</style>
<style lang="stylus" scoped>
.LeftnavMenu {
  float: left;
  width: 100px;
  height: 500px;
  background: rgba(4, 3, 0, 1);
}
</style>