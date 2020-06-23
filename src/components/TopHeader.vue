<template>
  <div class="binyi-toolbar">
    <span class="binyi-toolbar-icon">
      <img src="@/assets/images/UserLogin/logo.png" />
    </span>
    <span class="binyi-toolbar-name">XXXXXX管理平台V1.0</span>
  </div>
</template>

<style lang="stylus" scoped>
.binyi-toolbar {
  width: 100%;
  height: 100px;
  background: rgba(4, 3, 0, 1);
  line-height: 100px;
  display: flex;
  align-items: center;

  .binyi-toolbar-icon {
    margin: 0 20px 0 100px;
    width: 44px;

    img {
      width: 100%;
      vertical-align: middle;
    }
  }

  .binyi-toolbar-name {
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>