<template>
  <div>
    <ol>
      <li
        v-for="(item, index) in listInfo"
        :key="index"
        :class="{activeClass:index==activeIndex}"
        @click="changeFn(index)"
      >{{item}}</li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listInfo: ["背景模板", "文案模板", "音乐模板"],
      activeIndex: 0
    };
  },
  methods: {
    changeFn(index) {
      this.activeIndex = index;
      this.$emit("change-index", index);
    }
  }
};
</script>

<style lang="stylus" scoped>
ol {
  border-bottom: 1px solid #000;

  &:after {
    content: ' ';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  li {
    float: left;
    width: 120px;
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    text-align: center;

    &.activeClass {
      color: #ff6600;
      border-bottom: 2px solid #ff6600;
    }
  }
}
</style>

