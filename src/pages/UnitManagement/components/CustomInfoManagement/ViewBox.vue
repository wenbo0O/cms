<template>
  <div>
    <!-- 风俗信息管理 -->
    <component :is="indexComponent" />
    <LookCustomInfoManagement />
  </div>
</template>

<script>
import mixin from "../Mixins";

export default {
  mixins: [mixin],
  data() {
    return {
      componentName: [
        // 信息表单
        "TableCustomInfoManagement",
        // 新建信息 编辑信息
        "NewCustomInfoManagementFrom",
        // 查看信息
        "LookCustomInfoManagement"
      ]
    };
  },
  computed: {
    indexComponent() {
      return this.componentName[this.UnitManagement.indexCustomInfoManagement];
    }
  }
};
</script>