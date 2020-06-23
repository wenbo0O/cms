<template>
  <div>
    <template-settings-nav @change-index="onChangeIndex"></template-settings-nav>

    <!-- 背景模板 -->
    <!-- 文案模板 -->
    <!-- 音乐会模板 -->
    <component :is="componentName[activeIndex]"></component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "",
      componentName: [
        "TemplateSettingsBg",
        "TemplateSettingsText",
        "TemplateSettingsMusic"
      ],
      activeIndex: 0
    };
  },
  methods: {
    onChangeIndex(index) {
      this.activeIndex = index;
    }
  }
};
</script>

<style lang="stylus" scoped></style>

